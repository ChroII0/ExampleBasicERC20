import { Accordion } from "react-bootstrap";
import { AccordionItem } from "../AccordionItem";
import { DemoALl } from "./accordions/DemoAll";






const LIST_TITLE_COMPONETNS = [
    "TokenSale Demo"
]


export const TokenSaleDemo = () => {

    //#region Create Array Components 
    const ListComponents: Array<React.ReactNode> = [
        <DemoALl/>
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