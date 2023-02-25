import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image'





export const ContactInformation = () => {
    return (<>
        <Row className='mt-3 mb-4'>
            <Col className='' xs={12} md={4}>
                <Image
                    fluid={true}
                    roundedCircle={true}
                    src="https://i.pinimg.com/originals/e3/74/0f/e3740f045688f55bb9d03c3af389d356.jpg"
                />
            </Col>
            <Col className='' xs={12} md={8}>
                <h2 className='mb-3 text-md-start text-center mt-3 mt-md-0'>Vo Huynh Hai Dang</h2>
                <p><strong>Dob:</strong> 24-03-2001</p>
                <p><strong>Gender:</strong> Male</p>
                <p><strong>Phone:</strong> +84978293509</p>
                <p><strong>Email:</strong> vohuynhhaidang24032001@gmail.com</p>
                <p><strong>Website:</strong> <a href="https://dangvhh.netlify.app" className="text-decoration-none">https://dangvhh.netlify.app</a></p>
                <p><strong>Address:</strong> Thu Duc District, Ho Chi Minh</p>
            </Col>
        </Row>
    </>);
}