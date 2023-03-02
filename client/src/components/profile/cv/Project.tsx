import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


interface Props {
    data: object | any,
    github: string
}

export const Project = (props: Props) => {
    return (<>
        <Row className='mt-3 right-to-left'>
            <h3>PROJECTS</h3>
            <Col className='border-top border-dark'>
                <p className='pt-3'>{props.data.type} :
                    <a target="_blank" rel="noopener noreferrer" href={props.data.website} className="text-decoration-none"> {props.data.website}</a>
                </p>
                <ul>
                    {props.data.description.map((item: any, index: any)=>{
                        return(<li key={index}>{item}</li>)
                    })}
                </ul>
                <p className=''>
                    <a target="_blank" rel="noopener noreferrer" href={props.github} className="text-decoration-none">Open-Source Github</a>
                </p>
            </Col>
        </Row>
    </>);
}