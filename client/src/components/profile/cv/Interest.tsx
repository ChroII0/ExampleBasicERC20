
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface Props {
    data: object | any}

export const Interest = (props: Props) => {
    return (<>
        <Row className='mt-3'>
            <h3>INTERESTS</h3>
            <Col className='border-top border-dark'>
                <p className='pt-3'>{props.data.content}</p>
            </Col>
        </Row>
    </>);
}