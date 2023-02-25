import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface Props {
    data: object | any
}

export const Education = (props: Props) => {
    return (<>
        <Row className='mt-3'>
            <h3>EDUCATION</h3>
            {props.data.map((item: any, index: any) => {
                return (<>

                    <Col key={index} className={index===0 ? "border-top border-dark" : ""} xs={4}>
                        <p className='pt-3'>{item.time}</p>
                    </Col>
                    <Col className={index===0 ? "border-top border-dark" : "border-top"} xs={8}>
                        <p className='pt-3'><strong>{item.school}</strong></p>
                        {item.academicPrograms.map((item_: any, index: any) => {
                            return (<p key={index}>{item_}</p>)
                        })}
                        {item.isCollege && <p>Current GPA: {item.GPA}</p>}
                    </Col>

                </>)
            })}
        </Row>
    </>);
}