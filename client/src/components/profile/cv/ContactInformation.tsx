import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image'

interface Props {
    data: object | any
}



export const ContactInformation = (props: Props) => {
    return (<>
        <Row className='mt-3 mb-4'>
            <Col className='left-to-right' xs={12} md={4}>
                <Image
                    fluid={true}
                    roundedCircle={true}
                    src={props.data.avatar}
                />
            </Col>
            <Col className='right-to-left' xs={12} md={8}>
                <h2 className='mb-3 text-md-start text-center mt-3 mt-md-0'>{props.data.name}</h2>
                <p><strong>Dob:</strong> {props.data.dob}</p>
                <p><strong>Gender:</strong> {props.data.gender}</p>
                <p><strong>Phone:</strong> {props.data.phone}</p>
                <p><strong>Email:</strong> <a target="_self" className="text-decoration-none" href={`mailto:${props.data.email}`}>{props.data.email}</a></p>
                <p><strong>Website:</strong> <a href={props.data.website} target="_blank" rel="noopener noreferrer" className="text-decoration-none">{props.data.website}</a></p>
                <p><strong>Address:</strong> {props.data.address}</p>
            </Col>
        </Row>
    </>);
}