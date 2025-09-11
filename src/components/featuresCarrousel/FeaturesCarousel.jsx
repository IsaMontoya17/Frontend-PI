import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaCircle, FaRegCircle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "./FeaturesCarousel.module.css";

const FeaturesCarousel = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
  {
    icon: "👕",
    title: "Moda Circular",
    description: "Prolonga la vida útil de tus prendas y dale un nuevo propósito a la ropa olvidada.",
    stats: "Una segunda oportunidad para tu clóset"
  },
  {
    icon: "📍",
    title: "Ubicaciones Precisas",
    description: "Encuentra fácilmente tiendas y centros de donación cercanos con nuestra guía interactiva.",
    stats: "Todo al alcance de un clic"
  },
  {
    icon: "👥",
    title: "Comunidad Activa",
    description: "Conéctate con personas que comparten tu interés por un consumo más responsable y consciente.",
    stats: "Juntos hacemos el cambio"
  },
  {
    icon: "♻️",
    title: "Impacto Ambiental",
    description: "Reduce tu huella ecológica con decisiones de compra más sostenibles y responsables.",
    stats: "Pequeñas acciones, grandes resultados"
  }
];


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [features.length]);

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToFeature = (index) => {
    setCurrentFeature(index);
  };

  return (
    <section className={styles.featuresCarousel}>
      <Container>
        <Row>
          <Col md={12} className="text-center">
            <h2 className={styles.sectionTitle}>¿Por qué elegir EcoCloset?</h2>
            <p className={styles.sectionSubtitle}>
              Transformamos la manera en que consumes moda, creando un impacto positivo 
              para el planeta y la comunidad local.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className={styles.carouselWrapper}>
              <div className={styles.carouselContainer}>
                <div 
                  className={styles.carouselTrack}
                  style={{ transform: `translateX(-${currentFeature * 100}%)` }}
                >
                  {features.map((feature, index) => (
                    <div key={index} className={styles.featureSlide}>
                      <Card className={styles.featureCard}>
                        <Card.Body className={styles.featureCardBody}>
                          <div className={styles.featureIconWrapper}>
                            <div className={styles.featureIcon}>
                              {feature.icon}
                            </div>
                            <div className={styles.featureNumber}>
                              {index + 1}
                            </div>
                          </div>
                          <h3 className={styles.featureTitle}>{feature.title}</h3>
                          <p className={styles.featureDescription}>{feature.description}</p>
                          <div className={styles.featureStats}>
                            <span className={styles.statsIcon}>🌱</span>
                            {feature.stats}
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={prevFeature} 
                className={`${styles.carouselArrow} ${styles.arrowPrev}`}
                aria-label="Característica anterior"
              >
                <div className={styles.arrowContent}>
                  <FaArrowLeft className={styles.arrowIcon} />
                  <div className={styles.arrowCircle}></div>
                </div>
              </button>
              <button 
                onClick={nextFeature} 
                className={`${styles.carouselArrow} ${styles.arrowNext}`}
                aria-label="Siguiente característica"
              >
                <div className={styles.arrowContent}>
                  <FaArrowRight className={styles.arrowIcon} />
                  <div className={styles.arrowCircle}></div>
                </div>
              </button>
              
              <div className={styles.carouselDots}>
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToFeature(index)}
                    className={styles.dotButton}
                    aria-label={`Ir a característica ${index + 1}`}
                  >
                    {currentFeature === index ? (
                      <FaCircle className={styles.dotIconActive} />
                    ) : (
                      <FaRegCircle className={styles.dotIcon} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FeaturesCarousel;