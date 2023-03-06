import Container from 'react-bootstrap/Container';
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { useAppSelector } from '../redux/hooks';
import { selectProfile } from '../redux/profile/slides/profileSlide';




export const Footer = () => {
    const profile = useAppSelector(selectProfile);    
    return (
        <Container>
            <footer className="py-3 my-4 border-top">
                <ul className="list-unstyled d-flex justify-content-between">
                    <li className='flex-grow-1'>
                        <span className='d-block'>Visitor public IP: <strong>{profile.data.Visitor.visitor_ip}</strong></span>
                        <span className='d-block'>Access log: <strong>{profile.data.Visitor.access_log}</strong></span>
                        <span className='d-block'>Total access log: <strong>{profile.data.Visitor.total_access_log}</strong></span>
                        <span className=''>Last recent access time: <strong className='text-truncate'>{profile.data.lastRecentAccess}</strong></span>
                    </li>
                    <li className="ms-3"><a className="text-muted" target="_blank" rel="noopener noreferrer" href={profile.data.SocialMedia[0].facebook}
                    >{<BsFacebook size={30} />}</a></li>
                    <li className="ms-3"><a className="text-muted" target="_blank" rel="noopener noreferrer" href={profile.data.SocialMedia[0].instagram}
                    >{<BsInstagram size={30} />}</a></li>
                </ul>
            </footer>
        </Container>
    );
}