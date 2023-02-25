import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { clearData, selectEventEmitter } from '../../../redux/erc-20/slides/eventEmitterSlide';


const createElementModalAlert = (obj: any, level: string) => {
    const arrayHtmlElement: Array<React.ReactNode> = [];
    const keys: Array<string> = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        if (typeof obj[keys[i]] === "object") {
            arrayHtmlElement.push(<><p className='m-1'>{level} <strong>{keys[i]}:</strong> </p></>);
            arrayHtmlElement.push(createElementModalAlert(obj[keys[i]], level + "_"))
        }
        else {
            arrayHtmlElement.push(<><p className='m-1'>{level}  <strong>{keys[i]}:</strong> {obj[keys[i]].toString()}</p></>);
        }
    }
    return arrayHtmlElement;
}


export const ModalItem = () => {
    const Event = useAppSelector(selectEventEmitter);
    const dispatch = useAppDispatch();
    const dataRender = Object.keys(Event.data).length !== 0
        ? createElementModalAlert(JSON.parse(Event.data.toString()), "")
        : "";
    const handleClose = () => {
        dispatch(clearData());
    }
    return (
        <>
            <Modal show={Event.status} onHide={handleClose} size="lg" centered>
                <Alert variant={Event.variant} className='mb-0'>
                    <Modal.Header className='border-dark'>
                        <Modal.Title><Alert.Heading>{Event.title}</Alert.Heading></Modal.Title>
                    </Modal.Header>
                    {dataRender !== "" && (
                        <Modal.Body className='text-break'>
                            {dataRender}
                        </Modal.Body>
                        )}
                    <Modal.Footer className='border-dark'>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Alert>
            </Modal>
        </>
    );


}