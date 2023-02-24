import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { IMintBurnData } from '../../../../interface';
import { LoadingButton } from "../LoadingButton";
import { selectStatusBtn, setIsDisabled } from "../../../../redux/erc-20/slides/statusBtnSlide";
import { useAppDispatch, useAppSelector } from "../../../../redux/erc-20/hooks";
import { burnToken, getCurrentWalletTokenSale, getMyBalanceToken, getTotalSupply, mintToken } from '../../../../utils/interact';
import { checkInputNumber, createParsedData } from '../../../../utils/helpFunc';
import { ADDRESS_INPUT_NAME, BUTTON_INNERTEXT_BURN, BUTTON_INNERTEXT_MINT, MAX_INPUT_VALUE_TOKEN, MIN_INPUT_VALUE_TOKEN, STEP_INPUT_VALUE_TOKEN, TOKEN_INPUT_NAME } from '../../../../utils/constants';
import { setMyBalanceToken } from '../../../../redux/erc-20/slides/myBalanceTokenSlide';
import { setTokenSaleWallet } from '../../../../redux/erc-20/slides/tokenSaleWalletSlide';
import { setTotalSupply } from '../../../../redux/erc-20/slides/totalSupplySlide';
import { setErrorTransaction, setSuccessfulTransaction } from '../../../../redux/erc-20/slides/eventEmitterSlide';


export const MintOrBurnToken = () => {
    const [inputData, setInputData] = useState({} as IMintBurnData);
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
            const eventEmitter = (
                buttonText === BUTTON_INNERTEXT_MINT
                    ? await mintToken(inputData.address, inputData.amountToken)
                    : await burnToken(inputData.address, inputData.amountToken)
            )
            eventEmitter.on("data", async (data: object) => {
                dispatch(setSuccessfulTransaction(JSON.stringify(data)));
                dispatch(setMyBalanceToken(await getMyBalanceToken()));
                dispatch(setTokenSaleWallet(await getCurrentWalletTokenSale()));
                dispatch(setTotalSupply(await getTotalSupply()));
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
                        {BUTTON_INNERTEXT_MINT}
                        {(isLoad === BUTTON_INNERTEXT_MINT) && <LoadingButton />}
                    </Button>
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
                        {BUTTON_INNERTEXT_BURN}
                        {(isLoad === BUTTON_INNERTEXT_BURN) && <LoadingButton />}
                    </Button>
                </Form.Group>
            </Form>
            <span><strong>amount token: </strong>{MIN_INPUT_VALUE_TOKEN} - {MAX_INPUT_VALUE_TOKEN}</span><br />
        </>
    );
}