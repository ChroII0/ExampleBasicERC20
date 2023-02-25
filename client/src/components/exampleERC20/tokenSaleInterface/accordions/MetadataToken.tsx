import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { selectMetadataToken, setMetadataToken } from "../../../../redux/erc-20/slides/metadataTokenSlide";
import { selectUnit } from "../../../../redux/erc-20/slides/unitSlide";
import { withUnit } from "../../../../utils/helpFunc";
import { getMetadataToken, getTotalSupply } from "../../../../utils/interact";
import { selectTotalSupply, setTotalSupply } from '../../../../redux/erc-20/slides/totalSupplySlide';

import Alert from 'react-bootstrap/Alert';





export const MetadataToken = () => {

    const Token = useAppSelector(selectMetadataToken);
    const TotalSupply = useAppSelector(selectTotalSupply);
    const Unit = useAppSelector(selectUnit);
    const dispatch = useAppDispatch();
    const errorAlertInitialState = {
        errTitle: "",
        errContent: ""
    }
    const [errorAlert, setErrorAlert] = useState(errorAlertInitialState); 
    useEffect(() => {
        const fetchMetadataToken = async () => {
            try {
                const data = await getMetadataToken();
                dispatch(setMetadataToken(data));
                setErrorAlert(errorAlertInitialState);
            } catch (err: any) {
                setErrorAlert(JSON.parse(err.message));
            }
        }
        const fetchTotalSupply = async () => {
            try {
                const data = await getTotalSupply();
                if (TotalSupply.data !== data)
                {
                    dispatch(setTotalSupply(data));
                }
            } catch (err: any) {
                setErrorAlert(JSON.parse(err.message));
            }
        }
        fetchTotalSupply();
        fetchMetadataToken();
    }, [Token.data, TotalSupply.data]);

    return (
        <>
            <p><strong>Token Name: </strong>{Token.data.name}</p>
            <p><strong>Token Symbol: </strong>{Token.data.symbol}</p>
            <p><strong>Token Price: </strong>{withUnit(Token.data.price, Unit.data)} {Unit.data}</p>
            <p><strong>Owner Token: </strong>{Token.data.owner}</p>
            <p><strong>The total token supply: </strong>{TotalSupply.data} {Token.data.symbol}</p>
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