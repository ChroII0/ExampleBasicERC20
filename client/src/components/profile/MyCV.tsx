import Container from 'react-bootstrap/Container';
import { CareerObjective } from './cv/CareerObjective';
import { ContactInformation } from './cv/ContactInformation';
import { Education } from './cv/Education';
import { Interest } from './cv/Interest';
import { Project } from './cv/Project';
import { Skill } from './cv/Skill';
import { selectProfile } from '../../redux/profile/slides/profileSlide';
import { useAppSelector } from '../../redux/hooks';





export const MyCV = () => {
    const profile = useAppSelector(selectProfile);

    return (<>
        <Container className='col-xl-6'>
            <ContactInformation
                data={profile.data.contact[0]}
            />
            <CareerObjective
                data={profile.data.objective[0]}
            />
            <Education
                data={profile.data.education}
            />
            <Skill
                data={profile.data.skill}
            />
            <Interest
                data={profile.data.interest[0]}
            />
            <Project
                data={profile.data.project}
                github={profile.data.SocialMedia[0].github}
            />
        </Container>
    </>)
}