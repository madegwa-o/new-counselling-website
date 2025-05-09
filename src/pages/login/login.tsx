import { useState,type ChangeEvent,type FormEvent,type ReactElement } from 'react';
import {  FaEnvelope, FaIdCard, FaLock, FaArrowRight } from 'react-icons/fa';
import styles from './login.module.css';
import logo from '../../assets/karu-logo.jpg'
import {useAuthentication} from "../../hooks/AuthenticationContext.tsx";

export default function Login(): ReactElement {
    // State to manage form input values
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [regNumber, setRegNumber] = useState<string>('');
    const {login} = useAuthentication()

    // State to track which login method is active
    const [loginMethod, setLoginMethod] = useState<'email' | 'regNumber'>('email');

    // State for form validation and error handling
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Handle email login form submission
    const handleEmailLogin = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        console.log('Logging in with email:', email);

      //  login(email, password)
        window.location.href="/dashboard";
    };

    // Handle registration number login form submission
    const handleRegNumberLogin = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // Here you would integrate with your authentication service
        console.log('Logging in with registration number:', regNumber);

        login(regNumber, password)
    };

    // Switch between login methods
    const switchLoginMethod = (method: 'email' | 'regNumber'): void => {
        setLoginMethod(method);
        setError(null);
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                {/* Logo and Header */}
                <div className={styles.logoContainer}>
                    <div className={styles.logoWrapper}>
                        {/* School logo placeholder - replace with your actual logo */}
                        <div className={styles.logoPlaceholder}>
                            <img src={logo} className={styles.logo} alt="logo"/>
                        </div>
                    </div>
                    <h1 className={styles.title}>Karu Counselling</h1>
                    <p className={styles.subtitle}>Sign in to access counselling services</p>
                </div>

                {/* Login Method Toggle */}
                <div className={styles.loginMethodToggle}>
                    <button
                        className={`${styles.methodButton} ${loginMethod === 'email' ? styles.active : ''}`}
                        onClick={() => switchLoginMethod('email')}
                        type="button"
                    >
                        <FaEnvelope className={styles.methodIcon} />
                        <span>School Email</span>
                    </button>
                    <button
                        className={`${styles.methodButton} ${loginMethod === 'regNumber' ? styles.active : ''}`}
                        onClick={() => switchLoginMethod('regNumber')}
                        type="button"
                    >
                        <FaIdCard className={styles.methodIcon} />
                        <span>Registration Number</span>
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className={styles.errorMessage}>
                        {error}
                    </div>
                )}

                {/* Email & Password Login Form */}
                {loginMethod === 'email' && (
                    <form className={styles.loginForm} onSubmit={handleEmailLogin}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email" className={styles.srOnly}>School Email</label>
                            <div className={styles.inputWrapper}>
                                <FaEnvelope className={styles.inputIcon} />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="University Email"
                                    className={styles.input}
                                    value={email}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password" className={styles.srOnly}>Password</label>
                            <div className={styles.inputWrapper}>
                                <FaLock className={styles.inputIcon} />
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    className={styles.input}
                                    value={password}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={styles.loginButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Signing in...' : (
                                <>
                                    Sign In <FaArrowRight className={styles.buttonIcon} />
                                </>
                            )}
                        </button>
                    </form>
                )}

                {/* Registration Number Login Form */}
                {loginMethod === 'regNumber' && (
                    <form className={styles.loginForm} onSubmit={handleRegNumberLogin}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="regNumber" className={styles.srOnly}>Registration Number</label>
                            <div className={styles.inputWrapper}>
                                <FaIdCard className={styles.inputIcon} />
                                <input
                                    id="regNumber"
                                    type="text"
                                    placeholder="University Registration Number"
                                    className={styles.input}
                                    value={regNumber}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setRegNumber(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password" className={styles.srOnly}>Password</label>
                            <div className={styles.inputWrapper}>
                                <FaLock className={styles.inputIcon} />
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    className={styles.input}
                                    value={password}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={styles.loginButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Verifying...' : (
                                <>
                                    Verify Registration <FaArrowRight className={styles.buttonIcon} />
                                </>
                            )}
                        </button>
                    </form>
                )}

                {/* Help Link */}
                <div className={styles.helpLink}>
                    <a href="/help">Need help logging in?</a>
                </div>
            </div>

            {/* Footer */}
            <div className={styles.footer}>
                <p>© {new Date().getFullYear()} Karatuna University. All rights reserved.</p>
                <div className={styles.footerLinks}>
                    <a href="/privacy">Privacy Policy</a>
                    <span className={styles.divider}>•</span>
                    <a href="/terms">Terms of Service</a>
                    <span className={styles.divider}>•</span>
                    <a href="/contact">Contact</a>
                </div>
            </div>
        </div>
    );
}