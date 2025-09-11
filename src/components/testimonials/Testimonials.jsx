import { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import styles from "./Testimonials.module.css";

const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const testimonials = [
        {
            name: "María González",
            location: "Medellín, Colombia",
            text: "Desde que empecé a comprar ropa sostenible, no solo ahorro dinero, sino que contribuyo al cuidado del medio ambiente. ¡Todos deberían probarlo!",
            rating: 5,
            avatar: "👩‍💼"
        },
        {
            name: "Carlos Rodríguez",
            location: "Bogotá, Colombia",
            text: "La iniciativa de reciclaje textil ha transformado mi negocio. Ahora mis diseños son 100% sostenibles y mis clientes lo valoran muchísimo.",
            rating: 5,
            avatar: "👨‍🎨"
        },
        {
            name: "Ana Martínez",
            location: "Cali, Colombia",
            text: "Participar en los talleres de upcycling me enseñó a darle nueva vida a mi ropa vieja. ¡Es increíble lo que se puede crear con un poco de creatividad!",
            rating: 4,
            avatar: "👩‍🔧"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className={styles.testimonials}>
            <Container>
                <Row>
                    <Col md={12} className="text-center">
                        <h2 className={styles.sectionTitle}>Lo que dice nuestra comunidad</h2>
                        <p className={styles.sectionSubtitle}>
                            Historias reales de personas que han transformado su relación con la moda
                        </p>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <div className={styles.testimonialContainer}>
                            <div className={styles.testimonialCard}>
                                <div className={styles.testimonialRating}>
                                    {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                                        <FaStar key={i} className={styles.starIcon} />
                                    ))}
                                </div>
                                <blockquote className={styles.testimonialText}>
                                    "{testimonials[currentSlide].text}"
                                </blockquote>
                                <div className={styles.testimonialAuthor}>
                                    <div className={styles.authorAvatar}>
                                        {testimonials[currentSlide].avatar}
                                    </div>
                                    <div className={styles.authorInfo}>
                                        <div className={styles.authorName}>
                                            {testimonials[currentSlide].name}
                                        </div>
                                        <div className={styles.authorLocation}>
                                            📍 {testimonials[currentSlide].location}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button onClick={prevSlide} className={`${styles.testimonialBtn} ${styles.testimonialBtnPrev}`}>
                                <FaChevronLeft className={styles.btnIcon} />
                            </button>
                            <button onClick={nextSlide} className={`${styles.testimonialBtn} ${styles.testimonialBtnNext}`}>
                                <FaChevronRight className={styles.btnIcon} />
                            </button>

                            <div className={styles.testimonialDots}>
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ''}`}
                                    >
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

export default Testimonials;