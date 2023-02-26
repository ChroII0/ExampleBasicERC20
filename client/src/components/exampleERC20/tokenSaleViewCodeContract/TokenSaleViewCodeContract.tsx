import { Accordion } from "react-bootstrap";
import { AccordionItem } from "../AccordionItem";
import { MyTokenContractSyntax } from "./accordions/MyTokenContractSyntax";
import { TokenSaleContractSyntax } from "./accordions/TokenSaleContractSyntax";





const LIST_TITLE_COMPONETNS = [
    "MyToken Contract",
    "TokenSale Contract"
]


export const TokenSaleViewCodeContract = () => {

    //#region Create Array Components 
    const ListComponents: Array<React.ReactNode> = [
        <MyTokenContractSyntax/>,
        <TokenSaleContractSyntax/>
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