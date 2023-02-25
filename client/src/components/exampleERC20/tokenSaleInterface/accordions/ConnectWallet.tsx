import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { selectConnectWallet, setMyWallet } from '../../../../redux/erc-20/slides/connectWalletSlide';
import { setAlert, setErrorCall } from '../../../../redux/erc-20/slides/eventEmitterSlide';
import { selectMetadataToken } from '../../../../redux/erc-20/slides/metadataTokenSlide';
import { selectMyBalanceToken, setMyBalanceToken } from '../../../../redux/erc-20/slides/myBalanceTokenSlide';
import { selectStatusBtn, setIsDisabled } from '../../../../redux/erc-20/slides/statusBtnSlide';
import { selectUnit } from '../../../../redux/erc-20/slides/unitSlide';
import { BUTTON_INNERTEXT_CONNECT_WALLET } from '../../../../utils/constants';
import { createParsedData, withUnit } from '../../../../utils/helpFunc';
import { connectWallet, getCurrentWalletConnected, getMyBalanceToken } from '../../../../utils/interact';
import { LoadingButton } from '../LoadingButton';


export const ConnectWallet = () => {
    const MyWallet = useAppSelector(selectConnectWallet);
    const StatusBtn = useAppSelector(selectStatusBtn);
    const Unit = useAppSelector(selectUnit);
    const Token = useAppSelector(selectMetadataToken);
    const MyBalanceToken = useAppSelector(selectMyBalanceToken)
    const dispatch = useAppDispatch();
    const [isLoad, setIsLoad] = useState("" as string);
    const errorAlertInitialState = {
        errTitle: "",
        errContent: ""
    }
    const [errorAlert, setErrorAlert] = useState(errorAlertInitialState);

    useEffect(() => {
        const fetchMyWallet = async () => {
            try {
                const currentMyWallet = await getCurrentWalletConnected();
                if (currentMyWallet.balance !== MyWallet.data.balance) {
                    dispatch(setMyWallet(currentMyWallet));
                    setErrorAlert(errorAlertInitialState);
                }
            } catch (err: any) {
                setErrorAlert(JSON.parse(err.message));
            }
        }
        const fetchMyBalanceToken = async () => {
            try {
                const myBalanceToken = await getMyBalanceToken();
                if (myBalanceToken !== MyBalanceToken.data) {
                    dispatch(setMyBalanceToken(myBalanceToken));
                    setErrorAlert(errorAlertInitialState);
                }
            } catch (err: any) {
                setErrorAlert(JSON.parse(err.message));
            }
        }
        fetchMyBalanceToken();
        fetchMyWallet();
    }, [MyWallet.data, MyBalanceToken.data]);

    const handlClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsLoad(e.currentTarget.innerText);
        dispatch(setIsDisabled(true));
        try {
            const alertText = await connectWallet();
            dispatch(setAlert(alertText))
            dispatch(setMyWallet(await getCurrentWalletConnected()))
        }
        catch (err: any) {
            dispatch(setErrorCall(createParsedData(err.message)));
        }
        finally {
            dispatch(setIsDisabled(false));
            setIsLoad("");
        }
    }
    return (
        <>
            <Button
                variant="primary"
                type="button"
                onClick={handlClick}
                className="mb-3"
                disabled={StatusBtn.isDisabled}
            >
                {BUTTON_INNERTEXT_CONNECT_WALLET}
                {(isLoad === BUTTON_INNERTEXT_CONNECT_WALLET) && <LoadingButton />}
            </Button>
            <p><strong>Account: </strong>{MyWallet.data.address}</p>
            <p><strong>Balance: </strong>{withUnit(MyWallet.data.balance, Unit.data)} {Unit.data}</p>
            <p><strong>Balance Token: </strong>{MyBalanceToken.data} {Token.data.symbol}</p>
            {errorAlert.errTitle !== "" &&
                (<Alert variant="danger">
                    <Alert.Heading>{errorAlert.errTitle}</Alert.Heading>
                    <p>
                        {errorAlert.errContent}
                    </p>
                </Alert>)}
        </>
    );
}