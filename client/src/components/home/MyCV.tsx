import Container from 'react-bootstrap/Container';
import { CareerObjective } from './cv/CareerObjective';
import { ContactInformation } from './cv/ContactInformation';
import { Education } from './cv/Education';
import { Interest } from './cv/Interest';
import { Project } from './cv/Project';
import { Skill } from './cv/Skill';






export const MyCV = () =>{
    return(<>
    <Container>
            <ContactInformation/>
            <CareerObjective/>
            <Education/>
            <Skill/>
            <Interest/>
            <Project/>
    </Container>
    </>)
}