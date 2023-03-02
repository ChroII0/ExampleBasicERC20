import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

interface Props {
    data: object | any
}

export const Skill = (props: Props) => {
    return (<>
        <Row className='mt-3 right-to-left'>
            <h3>SKILLS</h3>
            <Col className='border-top border-dark'>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Skill</th>
                            <th>Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map((item: any, index: any) => {
                            return (
                                <>
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.level}</td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </Table>
            </Col>
        </Row>
    </>);
}