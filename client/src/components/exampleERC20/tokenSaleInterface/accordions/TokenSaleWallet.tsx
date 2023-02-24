import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/erc-20/hooks";
import { selectMetadataToken } from "../../../../redux/erc-20/slides/metadataTokenSlide";
import { selectTokenSaleWallet, setTokenSaleWallet } from "../../../../redux/erc-20/slides/tokenSaleWalletSlide";
import { selectUnit } from "../../../../redux/erc-20/slides/unitSlide";
import { withUnit } from "../../../../utils/helpFunc";
import { getCurrentWalletTokenSale } from "../../../../utils/interact";
import Alert from 'react-bootstrap/Alert';





export const TokenSaleWallet = () => {
    const TokenSaleWallet = useAppSelector(selectTokenSaleWallet);
    const Unit = useAppSelector(selectUnit);
    const Token = useAppSelector(selectMetadataToken);
    const dispatch = useAppDispatch();
    const errorAlertInitialState = {
        errTitle: "",
        errContent: ""
    }
    const [errorAlert, setErrorAlert] = useState(errorAlertInitialState); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCurrentWalletTokenSale();
                if (TokenSaleWallet.data.address !== data.balance
                    || TokenSaleWallet.data.balanceToken !== data.balanceToken
                    || TokenSaleWallet.data.remainingAllowance !== data.remainingAllowance) {
                    dispatch(setTokenSaleWallet(data));
                    setErrorAlert(errorAlertInitialState);
                }
            } catch (err: any) {
                setErrorAlert(JSON.parse(err.message));
            }
        }
        fetchData();
    }, [TokenSaleWallet.data]);

    return (
        <>
            <p><strong>Address: </strong>{TokenSaleWallet.data.address}</p>
            <p><strong>Balance: </strong>{withUnit(TokenSaleWallet.data.balance, Unit.data)} {Unit.data}</p>
            <p><strong>Balance Token: </strong>{TokenSaleWallet.data.balanceToken} {Token.data.symbol}</p>
            <p><strong>Remaining Allowance from ownerToken: </strong>{TokenSaleWallet.data.remainingAllowance} {Token.data.symbol}</p>
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