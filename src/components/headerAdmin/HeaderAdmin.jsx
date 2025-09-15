import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import logo from '../../assets/logo.png';
import styles from "./HeaderAdmin.module.css";

const HeaderAdmin = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: '¿Cerrar sesión?',
            text: "¿Estás seguro de que quieres salir?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/login");
            }
        });
    };

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
                    <div className="d-flex gap-2 ms-auto">
                        <Button variant="outline-light" onClick={handleLogout}>
                            <FaSignOutAlt className="me-2" />
                            Salir
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default HeaderAdmin;