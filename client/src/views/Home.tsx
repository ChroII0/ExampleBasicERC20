import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { MyCV } from "../components/profile/MyCV";
import { MyTranscript } from '../components/profile/MyTranscript';





export const Home = () => {
    return (<>
        <Tabs
            defaultActiveKey="cv"
            id="justify-tab-example"
            className="mb-3"
            justify
        >
            <Tab eventKey="cv" title="My CV">
                <MyCV />
            </Tab>
            <Tab eventKey="transcript" title="My Transcript">
                <MyTranscript />
            </Tab>
        </Tabs>
    </>);
}