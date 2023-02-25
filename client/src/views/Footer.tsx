import Container from 'react-bootstrap/Container';
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { useAppSelector } from '../redux/hooks';
import { selectProfile } from '../redux/profile/slides/profileSlide';




export const Footer = () => {
    const profile = useAppSelector(selectProfile);
    return (
        <Container>
            <footer className="py-3 my-4 border-top">
                <ul className="list-unstyled d-flex justify-content-end">
                    <li className="ms-3"><a className="text-muted" target="_blank" rel="noopener noreferrer" href={profile.data.SocialMedia[0].facebook}
                    >{<BsFacebook size={30} />}</a></li>
                    <li className="ms-3"><a className="text-muted" target="_blank" rel="noopener noreferrer" href={profile.data.SocialMedia[0].instagram}
                    >{<BsInstagram size={30} />}</a></li>
                </ul>
            </footer>
        </Container>
    );
}