import { Accordion } from "react-bootstrap";
import { AccordionItem } from "../AccordionItem";
import { AllowanceDemo } from "./accordions/AllowanceDemo";
import { BalanceOfDemo } from "./accordions/BalanceOfDemo";
import { ConnectWalletDemo } from "./accordions/ConnectWalletDemo";
import { MintOrBurnTokenDemo } from "./accordions/MintOrBurnTokenDemo";
import { TransactionDemo } from "./accordions/TransactionDemo";





const LIST_TITLE_COMPONETNS = [
    "Connect Wallet Demo",
    "Mint Or Burn Token (only ROLE) Demo",
    "Set Allowance To TokenSale Contract (only ROLE) Demo",
    "Check Balance Of Address Demo",
    "Transaction Demo"
]


export const TokenSaleDemo = () => {

    //#region Create Array Components 
    const ListComponents: Array<React.ReactNode> = [
        <ConnectWalletDemo/>,
        <MintOrBurnTokenDemo/>,
        <AllowanceDemo/>,
        <BalanceOfDemo/>,
        <TransactionDemo/>
    ]
    //#endregion

    return (<>
        <div className="d-flex flex-column p-2 container text-break">

            <Accordion alwaysOpen className='text-center'>
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
    </>);
}