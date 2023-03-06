import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';



interface Props {
    data: object[] | any,
    github: string
}

export const Project = (props: Props) => {
    return (<>
        <Row className='mt-3 right-to-left'>
            <h3>PROJECTS</h3>
            <Col className='border-top border-dark'>
                <ul className='list-unstyled'>
                    {props.data.map((project: any, index: any) => {
                        return (
                            <>
                                <li className='border-bottom'>
                                    <h5 className='pt-3'>{project.type}</h5>
                                    <h6>{project.time}</h6>
                                    <Table key={index} striped bordered className='mt-3'>
                                        <tbody>
                                            <tr>
                                                <th className='text-truncate'>Type</th>
                                                <td>{project.type}</td>
                                            </tr>
                                            {project.url_website !== "" && (
                                                <tr>
                                                    <th className='text-truncate'>Website</th>
                                                    <td>
                                                        <a target="_blank" rel="noopener noreferrer" href={project.url_website} className="text-decoration-none"> {project.url_website}</a>
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <th className='text-truncate'>Description</th>
                                                <td>{project.description}</td>
                                            </tr>
                                            <tr>
                                                <th className='text-truncate'>Team size</th>
                                                <td>{project.team_size}</td>
                                            </tr>
                                            <tr>
                                                <th className='text-truncate'>Responsibility in project</th>
                                                <td>{project.responsibility}</td>
                                            </tr>
                                            <tr>
                                                <th className='text-truncate'>Technologies Used</th>
                                                <td>{project.technologies_used}</td>
                                            </tr>
                                            {project.technical_project[0] !== "" &&
                                                (
                                                    <tr>
                                                        <th className='text-truncate'>Technical Project</th>
                                                        <td>
                                                            <ul className='list-unstyled'>
                                                                {project.technical_project.map((item: any, index: any) => {
                                                                    return (
                                                                        <>
                                                                            <li key={index} className={index < project.technical_project.length - 1 ? "py-2 border-bottom" : "py-2"}>
                                                                                <p className='fw-bold'>Part {index + 1}: {item.part}</p>
                                                                                {item.content}
                                                                            </li>
                                                                        </>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                </li>
                            </>
                        )
                    })}
                </ul>
                <p>
                    <a target="_blank" rel="noopener noreferrer" href={props.github} className="text-decoration-none">Open-Source Github</a>
                </p>
            </Col>
        </Row>
    </>);
}