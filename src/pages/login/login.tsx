import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

interface FormData {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
    });
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear error when user starts typing again
        if (errors[name as keyof FormData]) {
            setErrors({
                ...errors,
                [name]: '',
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {};
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // For demonstration purposes only - in a real app you would:
            // 1. Call your authentication API
            // 2. Store tokens, user data, etc.
            // 3. Redirect user based on authentication result

            console.log('Login successful', formData);
            navigate('/'); // Redirect to home page after successful login
        } catch (error) {
            console.error('Login failed', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleContinueWithGoogle = () => {
        // Implement Google OAuth flow
        console.log('Continue with Google clicked');
    };

    const handleContinueWithApple = () => {
        // Implement Apple sign-in flow
        console.log('Continue with Apple clicked');
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <div className={styles.loginArt}>
                    <div className={styles.artOverlay}>
                        <h1>Log In</h1>
                        <p>
                            By continuing, you agree to our User Agreement and Privacy Policy.
                        </p>
                    </div>
                </div>
                <div className={styles.loginFormContainer}>
                    <div className={styles.formWrapper}>
                        <h2>Log In</h2>
                        <div className={styles.socialLogins}>
                            <button
                                className={styles.socialButton}
                                onClick={handleContinueWithGoogle}
                            >
                                <img src="/icons/google.svg" alt="Google" />
                                Continue with Google
                            </button>
                            <button
                                className={styles.socialButton}
                                onClick={handleContinueWithApple}
                            >
                                <img src="/icons/apple.svg" alt="Apple" />
                                Continue with Apple
                            </button>
                        </div>

                        <div className={styles.divider}>
                            <span>OR</span>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.loginForm}>
                            <div className={styles.formGroup}>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Username"
                                    className={errors.username ? styles.inputError : ''}
                                />
                                {errors.username && <div className={styles.errorMessage}>{errors.username}</div>}
                            </div>

                            <div className={styles.formGroup}>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className={errors.password ? styles.inputError : ''}
                                />
                                {errors.password && <div className={styles.errorMessage}>{errors.password}</div>}
                            </div>

                            <div className={styles.rememberForgot}>
                                <div className={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                    />
                                    <label htmlFor="rememberMe">Stay logged in</label>
                                </div>
                                <Link to="/forgot-password" className={styles.forgotLink}>
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className={styles.loginButton}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Logging in...' : 'Log In'}
                            </button>
                        </form>

                        <div className={styles.signupPrompt}>
                            New to Reddit? <Link to="/register">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;