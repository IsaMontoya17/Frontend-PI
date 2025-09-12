import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loginAttempted, setLoginAttempted] = useState(false);

    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "email":
                if (!value) {
                    error = "El email es requerido";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = "Ingresa un email válido";
                }
                break;

            case "password":
                if (!value) {
                    error = "La contraseña es requerida";
                } else if (value.length < 6) {
                    error = "La contraseña debe tener al menos 6 caracteres";
                }
                break;

            default:
                break;
        }

        return error;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (loginAttempted || value !== "") {
            const error = validateField(name, value);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginAttempted(true);

        const emailError = validateField("email", formData.email);
        const passwordError = validateField("password", formData.password);

        setErrors({
            email: emailError,
            password: passwordError
        });

        if (emailError || passwordError) {
            return;
        }

        setIsLoading(true);

        // Simular llamada a API
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Aquí iría la lógica de autenticación real
            console.log("Login successful:", formData);

            // Redirección o manejo de éxito
            alert("¡Login exitoso! Bienvenido a EcoCloset");

        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.backgroundShapes}>
                <div className={styles.shape1}></div>
                <div className={styles.shape2}></div>
                <div className={styles.shape3}></div>
            </div>

            <Container className={styles.loginContainer}>
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col lg={5} md={7} sm={9}>
                        <div className={styles.loginCard}>
                            <div className={styles.loginHeader}>
                                <div className={styles.brandIcon}>🌱</div>
                                <h1 className={styles.loginTitle}>Bienvenido de vuelta</h1>
                                <p className={styles.loginSubtitle}>
                                    Inicia sesión en tu cuenta de EcoCloset
                                </p>
                            </div>
                            <Form onSubmit={handleSubmit} className={styles.loginForm}>
                                <Form.Group className={styles.formGroup}>
                                    <div className={styles.inputWrapper}>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Ingresa tu email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`${styles.formInput} ${errors.email ? styles.inputError : ""} ${formData.email && !errors.email ? styles.inputSuccess : ""}`}
                                            autoComplete="email"
                                        />
                                        <div className={styles.inputLine}></div>
                                    </div>
                                    {errors.email && (
                                        <div className={styles.errorMessage}>
                                            <span className={styles.errorIcon}>⚠️</span>
                                            {errors.email}
                                        </div>
                                    )}
                                </Form.Group>
                                <Form.Group className={styles.formGroup}>
                                    <div className={styles.inputWrapper}>
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Ingresa tu contraseña"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className={`${styles.formInput} ${errors.password ? styles.inputError : ""} ${formData.password && !errors.password ? styles.inputSuccess : ""}`}
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            className={styles.passwordToggle}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? "🙈" : "👁️"}
                                        </button>
                                        <div className={styles.inputLine}></div>
                                    </div>
                                    {errors.password && (
                                        <div className={styles.errorMessage}>
                                            <span className={styles.errorIcon}>⚠️</span>
                                            {errors.password}
                                        </div>
                                    )}
                                </Form.Group>
                                <div className={styles.loginOptions}>
                                    <Form.Check
                                        type="checkbox"
                                        id="rememberMe"
                                        label="Recordarme"
                                        className={styles.rememberCheck}
                                    />
                                    <a href="#" className={styles.forgotLink}>
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                </div>
                                <Button
                                    type="submit"
                                    className={styles.submitBtn}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className={styles.spinner}></div>
                                            Iniciando sesión...
                                        </>
                                    ) : (
                                        <>
                                            Iniciar Sesión
                                            <span className={styles.btnArrow}>→</span>
                                        </>
                                    )}
                                </Button>
                                <div className={styles.signupLink}>
                                    ¿No tienes una cuenta?{" "}
                                    <Link to="/signup" className={styles.signupLinkText}>
                                        Regístrate aquí
                                    </Link>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
