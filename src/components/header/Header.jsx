import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { FaUser, FaCog } from "react-icons/fa";
import logo from '../../assets/logo.png';
import styles from "./Header.module.css";

const Header = () => {
    return (
        <Navbar expand="lg" style={{ backgroundColor: "#2F3E46" }} className="shadow-sm px-3">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="text-white">
                    <img
                        src={logo}
                        alt="EcoCloset logo"
                        width="100"
                        height="60"
                        className="d-inline-block align-top me-2"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" className="bg-light" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0">
                        <Nav.Link as={Link} to="/" className={styles.navLink}>Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/directorio" className={styles.navLink}>Directorio</Nav.Link>
                        <Nav.Link as={Link} to="/mapa" className={styles.navLink}>Mapa</Nav.Link>
                        <Nav.Link as={Link} to="/calendario" className={styles.navLink}>Calendario</Nav.Link>
                        <Nav.Link as={Link} to="/foro" className={styles.navLink}>Foro</Nav.Link>

                    </Nav>
                    <div className="d-flex gap-2">
                        <Button as={Link} to="/signup" variant="light">
                            <FaUser className="me-2" />
                            Acceder / Registrarse
                        </Button>
                        <Button as={Link} to="/ajustes" variant="outline-light">
                            <FaCog className="me-2" />
                            Ajustes
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
