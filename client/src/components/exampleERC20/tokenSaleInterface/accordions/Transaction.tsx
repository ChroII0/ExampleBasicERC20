import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ITransactionData } from '../../../../interface';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { setMyWallet } from '../../../../redux/erc-20/slides/connectWalletSlide';
import { setErrorTransaction, setSuccessfulTransaction } from '../../../../redux/erc-20/slides/eventEmitterSlide';
import { setMyBalanceToken } from '../../../../redux/erc-20/slides/myBalanceTokenSlide';
import { selectStatusBtn, setIsDisabled } from '../../../../redux/erc-20/slides/statusBtnSlide';
import { setTokenSaleWallet } from '../../../../redux/erc-20/slides/tokenSaleWalletSlide';
import { ADDRESS_INPUT_NAME, BUTTON_INNERTEXT_BUY_TOKEN, BUTTON_INNERTEXT_SELL_TOKEN, BUTTON_INNERTEXT_SEND_TOKEN, ETHER_INPUT_NAME, MAX_INPUT_VALUE_ETHER, MAX_INPUT_VALUE_TOKEN, MIN_INPUT_VALUE_ETHER, MIN_INPUT_VALUE_TOKEN, STEP_INPUT_VALUE_ETHER, STEP_INPUT_VALUE_TOKEN, TOKEN_INPUT_NAME } from '../../../../utils/constants';
import { checkInputNumber, createParsedData } from '../../../../utils/helpFunc';
import { buyToken, getCurrentWalletConnected, getCurrentWalletTokenSale, getMyBalanceToken, getTotalSupply, sellToken, sendToken } from '../../../../utils/interact';
import { LoadingButton } from '../LoadingButton';

export const Transaction = () => {

    const [inputData, setInputData] = useState({} as ITransactionData);
    const [isLoad, setIsLoad] = useState("" as string);
    const StatusBtn = useAppSelector(selectStatusBtn);
    const dispatch = useAppDispatch();


    const handlChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputData(prevValue => {
            return {
                ...prevValue,
                [name]: (
                    name !== ADDRESS_INPUT_NAME
                        ? checkInputNumber(value, prevValue, name)
                        : value)
            };
        });
    }
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const buttonText = e.currentTarget.innerText;
        setIsLoad(buttonText);
        dispatch(setIsDisabled(true));
        try {
            const eventEmitter =
                (buttonText === BUTTON_INNERTEXT_BUY_TOKEN
                    ? await buyToken(inputData.amountEther)
                    :
                    (buttonText === BUTTON_INNERTEXT_SELL_TOKEN
                        ? await sellToken(inputData.amountToken)
                        : await sendToken(inputData.address, inputData.amountToken))
                )
            eventEmitter.on("data", async (data: object) => {
                dispatch(setSuccessfulTransaction(JSON.stringify(data)));
                dispatch(setMyWallet(await getCurrentWalletConnected()));
                dispatch(setMyBalanceToken(await getMyBalanceToken()));
                dispatch(setTokenSaleWallet(await getCurrentWalletTokenSale()));
            });
        }
        catch (err: any) {
            dispatch(setErrorTransaction(createParsedData(err.message)));
        }
        finally {
            dispatch(setIsDisabled(false));
            setIsLoad("");
        }
    }

    return (
        <>
            <Form className="row g-3">
                <Form.Group className="col-auto">
                    <Form.Control
                        type="number"
                        name={ETHER_INPUT_NAME}
                        value={inputData.amountEther}
                        min={MIN_INPUT_VALUE_ETHER}
                        max={MAX_INPUT_VALUE_ETHER}
                        step={STEP_INPUT_VALUE_ETHER}
                        onChange={handlChangeInput}
                        placeholder="amount ether"
                    />
                </Form.Group>
                <Form.Group className="col-auto">
                    <Button
                        variant="primary"
                        type="button"
                        onClick={handleClick}
                        className="mb-3"
                        disabled={
                            StatusBtn.isDisabled
                            || inputData.amountEther === undefined
                            || inputData.amountEther.toString() === ""}
                    >
                        {BUTTON_INNERTEXT_BUY_TOKEN}
                        {(isLoad === BUTTON_INNERTEXT_BUY_TOKEN) && <LoadingButton />}
                    </Button>
                </Form.Group>
                <Form.Group className="col-auto">
                    <Form.Control
                        type="number"
                        name={TOKEN_INPUT_NAME}
                        value={inputData.amountToken}
                        min={MIN_INPUT_VALUE_TOKEN}
                        max={MAX_INPUT_VALUE_TOKEN}
                        step={STEP_INPUT_VALUE_TOKEN}
                        onChange={handlChangeInput}
                        placeholder="amount token"
                    />
                </Form.Group>
                <Form.Group className="col-auto">
                    <Button
                        variant="primary"
                        type="button"
                        onClick={handleClick}
                        className="mb-3"
                        disabled={
                            StatusBtn.isDisabled
                            || inputData.amountToken === undefined
                            || inputData.amountToken.toString() === ""}
                    >
                        {BUTTON_INNERTEXT_SELL_TOKEN}
                        {(isLoad === BUTTON_INNERTEXT_SELL_TOKEN) && <LoadingButton />}
                    </Button>
                </Form.Group>
                <Form.Group className="col-auto">
                    <Form.Control
                        type="text"
                        name={ADDRESS_INPUT_NAME}
                        value={inputData.address}
                        onChange={handlChangeInput}
                        placeholder="address to"
                    />
                </Form.Group>
                <Form.Group className="col-auto">
                    <Button
                        variant="primary"
                        type="button"
                        onClick={handleClick}
                        className="mb-3"
                        disabled={
                            StatusBtn.isDisabled
                            || inputData.amountToken === undefined
                            || inputData.amountToken.toString() === ""
                            || inputData.address === undefined
                            || inputData.address === ""}
                    >
                        {BUTTON_INNERTEXT_SEND_TOKEN}
                        {(isLoad === BUTTON_INNERTEXT_SEND_TOKEN) && <LoadingButton />}
                    </Button>
                </Form.Group>
            </Form>
            <span><strong>amount ether: </strong>{MIN_INPUT_VALUE_ETHER} - {MAX_INPUT_VALUE_ETHER}</span><br />
            <span><strong>amount token: </strong>{MIN_INPUT_VALUE_TOKEN} - {MAX_INPUT_VALUE_TOKEN}</span><br />
        </>
    );
}
