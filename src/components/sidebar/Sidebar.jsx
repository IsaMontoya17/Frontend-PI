import { useState } from "react";
import { Nav, Collapse } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
    FaStore,
    FaUsers,
    FaCalendarAlt,
    FaImage,
    FaUserCog,
    FaChevronDown,
    FaList,
    FaPlus,
} from "react-icons/fa";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
    const [openTiendas, setOpenTiendas] = useState(false);
    const [openOrganizaciones, setOpenOrganizaciones] = useState(false);
    const [openEventos, setOpenEventos] = useState(false);
    const [openBanners, setOpenBanners] = useState(false);
    const [openUsuarios, setOpenUsuarios] = useState(false);

    return (
        <aside className={`${styles.sidebar} d-none d-md-block`}>
            <h4 className="px-3 py-2 border-bottom">Menú Admin</h4>
            <Nav className="flex-column">
                <div className={styles.navItem} onClick={() => setOpenTiendas(!openTiendas)}>
                    <span>
                        <FaStore className="me-2" />
                        Gestión Tiendas
                    </span>
                    <FaChevronDown className={`${styles.chevron} ${openTiendas ? styles.rotate : ""}`} />
                </div>
                <Collapse in={openTiendas}>
                    <div>
                        <Nav.Link as={NavLink} to="/admin/tiendas" className={styles.subItem}>
                            <FaList className="me-2" /> Ver Tiendas
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/admin/tiendas/crear" className={styles.subItem}>
                            <FaPlus className="me-2" /> Crear Tienda
                        </Nav.Link>
                    </div>
                </Collapse>

                <div className={styles.navItem} onClick={() => setOpenOrganizaciones(!openOrganizaciones)}>
                    <span>
                        <FaUsers className="me-2" />
                        Gestión Organizaciones
                    </span>
                    <FaChevronDown className={`${styles.chevron} ${openOrganizaciones ? styles.rotate : ""}`} />
                </div>
                <Collapse in={openOrganizaciones}>
                    <div>
                        <Nav.Link as={NavLink} to="/admin/organizaciones" className={styles.subItem}>
                            <FaList className="me-2" /> Ver Organizaciones
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/admin/organizaciones/crear" className={styles.subItem}>
                            <FaPlus className="me-2" /> Crear Organización
                        </Nav.Link>
                    </div>
                </Collapse>

                <div className={styles.navItem} onClick={() => setOpenEventos(!openEventos)}>
                    <span>
                        <FaCalendarAlt className="me-2" />
                        Gestión Eventos
                    </span>
                    <FaChevronDown className={`${styles.chevron} ${openEventos ? styles.rotate : ""}`} />
                </div>
                <Collapse in={openEventos}>
                    <div>
                        <Nav.Link as={NavLink} to="/admin/eventos" className={styles.subItem}>
                            <FaList className="me-2" /> Ver Eventos
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/admin/eventos/crear" className={styles.subItem}>
                            <FaPlus className="me-2" /> Crear Evento
                        </Nav.Link>
                    </div>
                </Collapse>

                <div className={styles.navItem} onClick={() => setOpenBanners(!openBanners)}>
                    <span>
                        <FaImage className="me-2" />
                        Gestión Banners
                    </span>
                    <FaChevronDown className={`${styles.chevron} ${openBanners ? styles.rotate : ""}`} />
                </div>
                <Collapse in={openBanners}>
                    <div>
                        <Nav.Link as={NavLink} to="/admin/banners" className={styles.subItem}>
                            <FaList className="me-2" /> Ver Banners
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/admin/banners/crear" className={styles.subItem}>
                            <FaPlus className="me-2" /> Crear Banner
                        </Nav.Link>
                    </div>
                </Collapse>

                <div className={styles.navItem} onClick={() => setOpenUsuarios(!openUsuarios)}>
                    <span>
                        <FaUserCog className="me-2" />
                        Gestión Usuarios
                    </span>
                    <FaChevronDown className={`${styles.chevron} ${openUsuarios ? styles.rotate : ""}`} />
                </div>
                <Collapse in={openUsuarios}>
                    <div>
                        <Nav.Link as={NavLink} to="/admin/usuarios" className={styles.subItem}>
                            <FaList className="me-2" /> Ver Usuarios
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/admin/usuarios/crear" className={styles.subItem}>
                            <FaPlus className="me-2" /> Crear Usuario
                        </Nav.Link>
                    </div>
                </Collapse>
            </Nav>
        </aside>
    );
};

export default Sidebar;
