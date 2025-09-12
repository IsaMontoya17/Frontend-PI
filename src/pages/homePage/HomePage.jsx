import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import heroImage from "../../assets/imagen1.png";
import Stats from "../../components/stats/Stats";
import Testimonials from "../../components/testimonials/Testimonials";
import FeaturesCarousel from "../../components/featuresCarrousel/FeaturesCarousel";

function HomePage() {

  const stats = [
    { number: "20+", label: "Tiendas Registradas", icon: "🏪" },
    { number: "100+", label: "Usuarios Activos", icon: "👥" },
  ];

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <Container className={styles.heroContainer}>
          <Row className="align-items-center min-vh-100">
            <Col lg={6} className="text-center text-lg-start">
              <div className={styles.heroBadge}>
                <span className={styles.badgeIcon}>♻️</span>
                Moda Sostenible en el Valle de Aburrá
              </div>
              <h1 className={styles.heroTitle}>
                Bienvenido a
                <span className={styles.heroTitleAccent}> EcoCloset</span>
              </h1>
              <p className={styles.heroSubtitle}>
                El directorio sostenible que conecta a la comunidad con tiendas de segunda mano,
                organizaciones de donación y ferias de moda responsable.
              </p>
              <div className={styles.heroButtons}>
                <Button as={Link} to="/directorio" className={styles.primaryBtn}>
                  Explorar Directorio
                  <span className={styles.btnArrow}>→</span>
                </Button>
                <Button as={Link} to="/mapa" className={styles.secondaryBtn}>
                  Ver Mapa Interactivo
                </Button>
              </div>
            </Col>
            <Col lg={6} className="d-none d-lg-block">
              <div className={styles.heroImageContainer}>
                <img
                  src={heroImage}
                  alt="EcoCloset sostenible"
                  className={styles.heroImage}
                />
                <div className={styles.floatingCard}>
                  <div className={styles.cardGrid}>
                    {stats.slice(0, 2).map((stat, index) => (
                      <div key={index} className={styles.miniStat}>
                        <span className={styles.statIcon}>{stat.icon}</span>
                        <div className={styles.statNumber}>{stat.number}</div>
                        <div className={styles.statLabel}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ¿Qué es EcoCloset? */}
      <section className={styles.about}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 className={styles.aboutTitle}>¿Qué es EcoCloset?</h2>
              <p className={styles.aboutText}>
                EcoCloset es una plataforma digital que centraliza la información
                sobre tiendas de ropa de segunda mano, organizaciones receptoras
                de donaciones y eventos de moda sostenible en el Valle de Aburrá.
              </p>
              <div className={styles.aboutFeatures}>
                <div className={styles.aboutFeature}>
                  <span className={styles.aboutFeatureIcon}>🌍</span>
                  <span>Impacto ambiental positivo</span>
                </div>
                <div className={styles.aboutFeature}>
                  <span className={styles.aboutFeatureIcon}>🤝</span>
                  <span>Fortalecimiento de la economía local</span>
                </div>
                <div className={styles.aboutFeature}>
                  <span className={styles.aboutFeatureIcon}>💚</span>
                  <span>Promoción del consumo responsable</span>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className={styles.aboutImageGrid}>
                <div className={styles.aboutImageItem}>🌱</div>
                <div className={styles.aboutImageItem}>👗</div>
                <div className={styles.aboutImageItem}>♻️</div>
                <div className={styles.aboutImageItem}>🏪</div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <FeaturesCarousel />

      <section id="stats-section" className={styles.statsSection}>
        <Container>
          <Row>
            <Col md={12} className="text-center">
              <h2 className={styles.statsTitle}>La Realidad Textil en Colombia</h2>
              <p className={styles.statsSubtitle}>
                Conoce las cifras que reflejan el impacto del consumo y la moda en nuestra comunidad.
              </p>
            </Col>
          </Row>
          <Stats />
        </Container>
      </section>

      <Testimonials />

      {/* ¡Únete al movimiento de la moda sostenible! */}
      <section className={styles.cta}>
        <Container>
          <Row>
            <Col md={12} className="text-center">
              <h2 className={styles.ctaTitle}>
                ¡Únete al movimiento de la moda sostenible!
              </h2>
              <p className={styles.ctaSubtitle}>
                Sé parte del cambio que Medellín necesita. Descubre, dona, compra y contribuye
                a un futuro más verde para nuestra ciudad.
              </p>
              <div className={styles.ctaButtons}>
                <Button as={Link} to="/signup" className={styles.ctaPrimaryBtn}>
                  💚 Comenzar Ahora
                </Button>
                <Button as={Link} to="/directorio" className={styles.ctaSecondaryBtn}>
                  Conocer Más
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default HomePage;