import Accordion from 'react-bootstrap/Accordion';
interface Props {
    title: string,
    body: React.ReactNode;
    eventKey: string,
}

export const AccordionItem = (props: Props) => {
    return (
        <Accordion.Item eventKey={props.eventKey}>
            <Accordion.Header><h5>{props.title}</h5></Accordion.Header>
            <Accordion.Body>
                {props.body}
            </Accordion.Body>
        </Accordion.Item>
    );
}