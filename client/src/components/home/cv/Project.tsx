import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';




export const Project = () => {
    return (<>
        <Row className='mt-3'>
            <h3>PROJECTS</h3>
            <Col className='border-top border-dark'>
                <p className='pt-3'>Personal Website :
                    <a href="https://dangvhh.netlify.app" className="text-decoration-none"> https://dangvhh.netlify.app</a>
                </p>
                <ul>
                    <li>Contains two pages : a personal CV and a basic ERC-20 project</li>
                    <li>Technologies Used : React, Nodejs</li>
                </ul>
                <p className=''>
                    <a href="https://github.com/dhhVo01" className="text-decoration-none">Open-Source Github</a>
                </p>
            </Col>
        </Row>
    </>);
}