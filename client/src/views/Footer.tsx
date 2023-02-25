import Container from 'react-bootstrap/Container';
import { BsFacebook, BsInstagram } from "react-icons/bs";




export const Footer = () => {
    return (
        <Container>
            <footer className="py-3 my-4 border-top">
                <ul className="list-unstyled d-flex justify-content-end">
                    <li className="ms-3"><a className="text-muted" href="#">{<BsFacebook size={30}/>}</a></li>
                    <li className="ms-3"><a className="text-muted" href="#">{<BsInstagram size={30}/>}</a></li>
                    <li className="ms-3"><a className="text-muted" href="#"></a></li>
                </ul>
            </footer>
        </Container>
    );
}