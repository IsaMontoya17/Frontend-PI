import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; 
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="text-center text-md-start">
          <Col md={4} className="mb-3">
            <h5 className={styles.logo}>EcoCloset</h5>
            <p className={styles.text}>
              Plataforma de moda sostenible y economía circular en Antioquia.
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h6 className={styles.sectionTitle}>Secciones</h6>
            <ul className={styles.links}>
              <li><a href="/">Inicio</a></li>
              <li><a href="/directorio">Directorio</a></li>
              <li><a href="/mapa">Mapa</a></li>
              <li><a href="/eventos">Eventos</a></li>
              <li><a href="/foro">Foro</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h6 className={styles.sectionTitle}>Síguenos</h6>
            <div className={styles.socials}>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <FaXTwitter />
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            <p className={styles.copy}>
              &copy; {new Date().getFullYear()} EcoCloset. Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
