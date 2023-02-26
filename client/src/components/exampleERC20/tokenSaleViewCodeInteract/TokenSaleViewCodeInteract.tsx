import { Accordion } from "react-bootstrap";
import { AccordionItem } from "../AccordionItem";
import { AllownaceSyntax } from "./accordions/AllowanceSyntax";
import { BalanceOfSyntax } from "./accordions/BalanceOfSyntax";
import { ConnectWalletSyntax } from "./accordions/ConnectWalletSyntax";
import { MetadataTokenSyntax } from "./accordions/MetadataTokenSyntax";
import { MintOrBurnTokenSyntax } from "./accordions/MintOrBurnTokenSyntax";
import { TokenSaleWalletSyntax } from "./accordions/TokebSaleWalletSyntax";
import { TransactionSyntax } from "./accordions/TransactionSyntax";




const LIST_TITLE_COMPONETNS = [
    "Connect Wallet",
    "Metadata Token",
    "TokenSale Contract Wallet",
    "Mint Or Burn Token (only ROLE)",
    "Set Allowance To TokenSale Contract (only ROLE)",
    "Check Balance Of Address",
    "Transaction"
]


export const TokenSaleViewCodeInteract = () => {

    //#region Create Array Components 
    const ListComponents: Array<React.ReactNode> = [
        <ConnectWalletSyntax />,
        <MetadataTokenSyntax/>,
        <TokenSaleWalletSyntax/>,
        <MintOrBurnTokenSyntax/>,
        <AllownaceSyntax/>,
        <BalanceOfSyntax/>,
        <TransactionSyntax/>
    ]
    //#endregion

    return (<>
        <div className="d-flex flex-column p-2 container text-break">

            <Accordion alwaysOpen>
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