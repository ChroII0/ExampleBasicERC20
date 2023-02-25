import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



export const Education = () => {
    return (<>
        <Row className='mt-3'>
            <h3>EDUCATION</h3>
            <Col className='border-top border-dark' xs={4}>
                <p className='pt-3'>2019 - Present</p>
            </Col>
            <Col className='border-top border-dark' xs={8}>
                <p className='pt-3'><strong>University of Information Technology - VNUHCM</strong></p>
                <p>Information Technology</p>
                <p>Current GPA: 8.04</p>
            </Col>
            <Col xs={4}>
                <p className='pt-3'>2022 - 2022</p>
            </Col>
            <Col className='border-top' xs={8}>
                <p className='pt-3'><strong>Udemy</strong></p>
                <p>Web Development Bootcamp</p>
                <p>Ethereum and Solidity: The Complete Developer's Guide</p>
            </Col>
        </Row>
    </>);
}