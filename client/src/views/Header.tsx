import Container from 'react-bootstrap/Container';
import { NavLink } from "react-router-dom";


export const LIST_PAGES = [
    "",
    "ERC20 Example"
]

export const Header = () => {
    const activeClassName = "nav-link active";
    return (
        <Container>
            <header className="d-flex justify-content-center py-3 border-bottom top-to-bottom">
                <ul className="nav nav-pills">
                    {LIST_PAGES.map((page, index) => {
                        return (
                            <li key={index} className="nav-item">
                                <NavLink to={page}
                                    className={({ isActive }) =>
                                        isActive ? activeClassName : "nav-link"
                                    }
                                >
                                    {page === "" ? "Home" : page}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </header>
        </Container>
    );
}