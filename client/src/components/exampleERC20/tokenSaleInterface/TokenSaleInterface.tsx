//#region Import Components
import { BalanceOf } from "./accordions/BalanceOf";
import { ConnectWallet } from "./accordions/ConnectWallet";
import { MetadataToken } from "./accordions/MetadataToken";
import { MintOrBurnToken } from "./accordions/MintOrBurnToken";
import { SelectUnit } from "./SelectUnit";
import { Transaction } from "./accordions/Transaction";
import { AccordionItem } from "../AccordionItem";
import { TokenSaleWallet } from "./accordions/TokenSaleWallet";
import { Allowance } from "./accordions/Allowance";
import Accordion from 'react-bootstrap/Accordion';
import { ModalItem } from "./ModalItem";
//#endregion





const LIST_TITLE_COMPONETNS = [
    "Connect Wallet",
    "Metadata Token",
    "TokenSale Contract Wallet",
    "Mint Or Burn Token (only ROLE)",
    "Set Allowance To TokenSale Contract (only ROLE)",
    "Check Balance Of Address",
    "Transaction"
]



export const TokenSaleInterface = () => {


    //#region Create Array Components 
    const ListComponents: Array<React.ReactNode> = [
        <ConnectWallet/>,
        <MetadataToken />,
        <TokenSaleWallet />,
        <MintOrBurnToken/>,
        <Allowance/>,
        <BalanceOf/>,
        <Transaction/>
    ]
    //#endregion
    return (
        <>
            <div className="d-flex flex-column p-2 container text-break">
                <SelectUnit/>
                <ModalItem/>
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                    {ListComponents.map((item, index) => {
                        return (
                            <AccordionItem
                                key={index}
                                eventKey={index.toString()}
                                title={LIST_TITLE_COMPONETNS[index]}
                                body={item}
                            />
                        );
                    })}
                </Accordion>
            </div>
        </>
    );
}