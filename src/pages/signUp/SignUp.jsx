import { useState } from "react";
import styles from "./SignUp.module.css";

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [signupAttempted, setSignupAttempted] = useState(false);

    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "firstName":
                if (!value) {
                    error = "El nombre es requerido";
                } else if (value.length < 2) {
                    error = "El nombre debe tener al menos 2 caracteres";
                }
                break;

            case "lastName":
                if (!value) {
                    error = "El apellido es requerido";
                } else if (value.length < 2) {
                    error = "El apellido debe tener al menos 2 caracteres";
                }
                break;

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
                } else if (value.length < 8) {
                    error = "La contraseña debe tener al menos 8 caracteres";
                } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                    error = "Debe contener mayúscula, minúscula y número";
                }
                break;

            case "confirmPassword":
                if (!value) {
                    error = "Confirma tu contraseña";
                } else if (value !== formData.password) {
                    error = "Las contraseñas no coinciden";
                }
                break;

            case "acceptTerms":
                if (!value) {
                    error = "Debes aceptar los términos y condiciones";
                }
                break;

            default:
                break;
        }

        return error;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));

        if (signupAttempted || (type !== "checkbox" && value !== "")) {
            const error = validateField(name, newValue);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));

            // Validar confirmPassword cuando cambie password
            if (name === "password" && formData.confirmPassword) {
                const confirmError = formData.confirmPassword !== value ? "Las contraseñas no coinciden" : "";
                setErrors(prev => ({
                    ...prev,
                    confirmPassword: confirmError
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSignupAttempted(true);

        const newErrors = {};
        Object.keys(formData).forEach(key => {
            newErrors[key] = validateField(key, formData[key]);
        });

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error !== "");
        if (hasErrors) {
            return;
        }

        setIsLoading(true);

        // Simular llamada a API
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log("Signup successful:", formData);
            alert("¡Registro exitoso! Bienvenido a EcoCloset");

        } catch (error) {
            console.error("Signup error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.signupPage}>
            <div className={styles.backgroundShapes}>
                <div className={styles.shape1}></div>
                <div className={styles.shape2}></div>
                <div className={styles.shape3}></div>
                <div className={styles.shape4}></div>
            </div>

            <div className={styles.signupContainer}>
                <div className={styles.signupRow}>
                    <div className={styles.signupCol}>
                        <div className={styles.signupCard}>
                            <div className={styles.signupHeader}>
                                <div className={styles.brandIcon}>🌱</div>
                                <h1 className={styles.signupTitle}>Únete a EcoCloset</h1>
                                <p className={styles.signupSubtitle}>
                                    Crea tu cuenta y comienza tu viaje hacia la moda sostenible
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className={styles.signupForm}>
                                <div className={styles.nameRow}>
                                    <div className={styles.formGroup}>
                                        <div className={styles.inputWrapper}>
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="Nombre"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className={`${styles.formInput} ${errors.firstName ? styles.inputError : ""} ${formData.firstName && !errors.firstName ? styles.inputSuccess : ""}`}
                                                autoComplete="given-name"
                                            />
                                            <div className={styles.inputLine}></div>
                                        </div>
                                        {errors.firstName && (
                                            <div className={styles.errorMessage}>
                                                <span className={styles.errorIcon}>⚠️</span>
                                                {errors.firstName}
                                            </div>
                                        )}
                                    </div>

                                    <div className={styles.formGroup}>
                                        <div className={styles.inputWrapper}>
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Apellido"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className={`${styles.formInput} ${errors.lastName ? styles.inputError : ""} ${formData.lastName && !errors.lastName ? styles.inputSuccess : ""}`}
                                                autoComplete="family-name"
                                            />
                                            <div className={styles.inputLine}></div>
                                        </div>
                                        {errors.lastName && (
                                            <div className={styles.errorMessage}>
                                                <span className={styles.errorIcon}>⚠️</span>
                                                {errors.lastName}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Correo electrónico"
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
                                </div>

                                <div className={styles.formGroup}>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Contraseña"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className={`${styles.formInput} ${errors.password ? styles.inputError : ""} ${formData.password && !errors.password ? styles.inputSuccess : ""}`}
                                            autoComplete="new-password"
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
                                </div>

                                <div className={styles.formGroup}>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Confirmar contraseña"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className={`${styles.formInput} ${errors.confirmPassword ? styles.inputError : ""} ${formData.confirmPassword && !errors.confirmPassword ? styles.inputSuccess : ""}`}
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            className={styles.passwordToggle}
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? "🙈" : "👁️"}
                                        </button>
                                        <div className={styles.inputLine}></div>
                                    </div>
                                    {errors.confirmPassword && (
                                        <div className={styles.errorMessage}>
                                            <span className={styles.errorIcon}>⚠️</span>
                                            {errors.confirmPassword}
                                        </div>
                                    )}
                                </div>

                                <div className={styles.formGroup}>
                                    <div className={styles.termsWrapper}>
                                        <label className={styles.termsLabel}>
                                            <input
                                                type="checkbox"
                                                name="acceptTerms"
                                                checked={formData.acceptTerms}
                                                onChange={handleInputChange}
                                                className={`${styles.termsCheck} ${errors.acceptTerms ? styles.checkboxError : ""}`}
                                            />
                                            <span className={styles.checkmark}></span>
                                            <span className={styles.termsText}>
                                                Acepto los{" "}
                                                <a href="#" className={styles.termsLink}>
                                                    términos y condiciones
                                                </a>{" "}
                                                y la{" "}
                                                <a href="#" className={styles.termsLink}>
                                                    política de privacidad
                                                </a>
                                            </span>
                                        </label>
                                    </div>
                                    {errors.acceptTerms && (
                                        <div className={styles.errorMessage}>
                                            <span className={styles.errorIcon}>⚠️</span>
                                            {errors.acceptTerms}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className={styles.submitBtn}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className={styles.spinner}></div>
                                            Creando cuenta...
                                        </>
                                    ) : (
                                        <>
                                            Crear Cuenta
                                            <span className={styles.btnArrow}>→</span>
                                        </>
                                    )}
                                </button>

                                <div className={styles.loginLink}>
                                    ¿Ya tienes una cuenta?{" "}
                                    <a href="/login" className={styles.loginLinkText}>
                                        Inicia sesión aquí
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;