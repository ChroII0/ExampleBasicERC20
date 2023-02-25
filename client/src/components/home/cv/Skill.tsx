import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';



export const Skill = () => {
    const listSkill = [
        "HTML", "CSS", "Bootstrap", "React", "Nodejs", "JavaScript", "TypeScript",
        "MongoDB", "SQL", "Python", "Solidity", "VS Code", "Truffle", "Docker", "Minikube", "Git", "GitHub", "Linux command line (CLI)"
    ]
    return (<>
        <Row className='mt-3'>
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
                        {listSkill.map((item, index) => {
                            return (
                                <>
                                    <tr>
                                        <td>{item}</td>
                                        <td>Basic</td>
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