import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAppDispatch, useAppSelector } from "../../../../redux/erc-20/hooks";
import { setErrorCall } from "../../../../redux/erc-20/slides/eventEmitterSlide";
import { selectMetadataToken } from "../../../../redux/erc-20/slides/metadataTokenSlide";
import { selectStatusBtn, setIsDisabled } from "../../../../redux/erc-20/slides/statusBtnSlide";
import { BUTTON_INNERTEXT_BALANCEOF } from "../../../../utils/constants";
import { createParsedData } from "../../../../utils/helpFunc";
import { getBalanceOf } from "../../../../utils/interact";
import { LoadingButton } from "../LoadingButton";



export const BalanceOf = () => {
    const [inputAddress, setInputAddress] = useState("" as string);
    const [balanceOf, setBalanceOf] = useState("0" as string);
    const Token = useAppSelector(selectMetadataToken);
    const [isLoad, setIsLoad] = useState(false as boolean);
    const StatusBtn = useAppSelector(selectStatusBtn);
    const dispatch = useAppDispatch();

    const handlChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputAddress(e.target.value);
    }
    const handlClick = async () => {
        setIsLoad(true);
        dispatch(setIsDisabled(true));
        try {
            const data = await getBalanceOf(inputAddress);
            setBalanceOf(data);
        }
        catch (err: any) {
            dispatch(setErrorCall(createParsedData(err.message)));
        }
        finally {
            dispatch(setIsDisabled(false));
            setIsLoad(false);
        }
    }
    return (
        <>
            <Form className="row g-3">
                <Form.Group className="col-auto">
                    <Form.Control
                        type="text"
                        value={inputAddress}
                        onChange={handlChangeInput}
                        placeholder="address _owner"
                    />
                </Form.Group>
                <Form.Group className="col-auto">
                    <Button
                        variant="primary"
                        type="button"
                        onClick={handlClick}
                        className="mb-3"
                        disabled={
                            StatusBtn.isDisabled
                            || inputAddress === undefined
                            || inputAddress === ""}
                    >
                        {BUTTON_INNERTEXT_BALANCEOF}
                        {isLoad && <LoadingButton />}
                    </Button>
                </Form.Group>
            </Form>
            <p><strong>Balance token: </strong>{balanceOf} {Token.data.symbol}</p>
        </>
    );
}