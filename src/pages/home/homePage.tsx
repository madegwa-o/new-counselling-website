import { useState } from 'react';
import { FaChevronRight, FaCalendarCheck, FaUsers, FaBook, FaShieldAlt, FaGraduationCap, FaHandHoldingHeart } from 'react-icons/fa';
import styles from './homePage.module.css';
import image  from '../../assets/counselling-group.jpg'

export default function HomePage() {
    const [email, setEmail] = useState('');

    // Stats to display
    const stats = [
        { number: '10,000+', label: 'Students supported' },
        { number: '24/7', label: 'Crisis support' },
        { number: '50+', label: 'Specialized counselors' },
        { number: '98%', label: 'Student satisfaction' }
    ];

    // Features to display
    const features = [
        {
            icon: <FaCalendarCheck />,
            title: 'Easy Scheduling',
            description: 'Book appointments online with just a few clicks. Choose from in-person or virtual sessions that fit your schedule.'
        },
        {
            icon: <FaUsers />,
            title: 'Peer Support',
            description: 'Connect with trained student mentors who understand what you\'re going through and can offer guidance.'
        },
        {
            icon: <FaBook />,
            title: 'Resource Library',
            description: 'Access our extensive collection of articles, videos, and self-help tools for managing various mental health concerns.'
        },
        {
            icon: <FaShieldAlt />,
            title: 'Confidential Service',
            description: 'All counselling sessions are completely confidential. Your privacy and wellbeing are our top priorities.'
        }
    ];

    // Resources categories
    const categories = [
        'Anxiety & Stress',
        'Depression',
        'Relationships',
        'Academic Pressure',
        'Self-Care',
        'Substance Use'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here (in a real app)
        alert(`Thank you for signing up with ${email}! You'll receive our newsletter soon.`);
        setEmail('');
    };

    return (
        <div className={styles.homePage}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Your mental wellbeing matters at <span className={styles.highlight}>Karatuna University</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Karu Counselling provides confidential support, resources, and guidance to help you thrive during your university journey.
                    </p>

                    <div className={styles.ctaContainer}>
                        <button className={styles.primaryButton}>
                            Book a Session <FaChevronRight className={styles.buttonIcon} />
                        </button>
                        <button className={styles.secondaryButton}>
                            Join Us
                        </button>
                    </div>

                    <p className={styles.ctaCaption}>
                        Free for all enrolled students. No referral needed.
                    </p>
                </div>

                <div className={styles.heroImage}>
                    <img
                        src={image}
                        alt="Students receiving counseling support"
                        className={styles.image}
                    />
                </div>
            </section>

            {/* Stats Section */}
            <section className={styles.statsSection}>
                <div className={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <div className={styles.statItem} key={index}>
                            <div className={styles.statNumber}>{stat.number}</div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.featuresSection}>
                <h2 className={styles.sectionTitle}>How We Can Help You</h2>
                <p className={styles.sectionSubtitle}>
                    Our comprehensive counselling services are designed to support every aspect of your university life.
                </p>

                <div className={styles.featuresGrid}>
                    {features.map((feature, index) => (
                        <div className={styles.featureCard} key={index}>
                            <div className={styles.featureIcon}>{feature.icon}</div>
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.featureDescription}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Resources Section */}
            <section className={styles.resourcesSection}>
                <div className={styles.resourcesContent}>
                    <h2 className={styles.sectionTitle}>Resources for Every Need</h2>
                    <p className={styles.sectionSubtitle}>
                        Browse our collection of self-help materials and tools organized by category.
                    </p>

                    <div className={styles.categoriesGrid}>
                        {categories.map((category, index) => (
                            <a href={`/resources/${category.toLowerCase().replace(/\s+/g, '-')}`} className={styles.categoryCard} key={index}>
                                <span className={styles.categoryTitle}>{category}</span>
                                <FaChevronRight className={styles.categoryIcon} />
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Support Section */}
            <section className={styles.supportSection}>
                <div className={styles.supportCard}>
                    <div className={styles.supportContent}>
                        <h2 className={styles.supportTitle}>Need Immediate Support?</h2>
                        <p className={styles.supportText}>
                            Our crisis counsellors are available 24/7. Don't hesitate to reach out if you're experiencing a mental health emergency.
                        </p>
                        <button className={styles.emergencyButton}>
                            Get Immediate Help
                        </button>
                    </div>
                    <div className={styles.contactInfo}>
                        <p className={styles.contactItem}>Campus Emergency: <strong>555-1234</strong></p>
                        <p className={styles.contactItem}>National Helpline: <strong>1-800-273-8255</strong></p>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className={styles.newsletterSection}>
                <div className={styles.newsletterContent}>
                    <FaHandHoldingHeart className={styles.newsletterIcon} />
                    <h2 className={styles.newsletterTitle}>Stay Connected</h2>
                    <p className={styles.newsletterText}>
                        Subscribe to our newsletter for mental health tips, event announcements, and resources.
                    </p>

                    <form className={styles.newsletterForm} onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={styles.emailInput}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className={styles.subscribeButton}>
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerLogo}>
                        <FaGraduationCap className={styles.footerIcon} />
                        <span className={styles.footerName}>Karu Counselling</span>
                    </div>

                    <div className={styles.footerLinks}>
                        <a href="/about" className={styles.footerLink}>About Us</a>
                        <a href="/services" className={styles.footerLink}>Services</a>
                        <a href="/resources" className={styles.footerLink}>Resources</a>
                        <a href="/contact" className={styles.footerLink}>Contact</a>
                        <a href="/privacy" className={styles.footerLink}>Privacy Policy</a>
                    </div>

                    <p className={styles.footerCopyright}>
                        © {new Date().getFullYear()} Karatuna University. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
