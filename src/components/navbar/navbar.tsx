import { useState, useEffect,type MouseEvent,type ReactElement } from 'react';
import { FaGraduationCap, FaChevronDown, FaChevronUp, FaSignInAlt, FaComments, FaCalendarAlt, FaNewspaper, FaUserCircle } from 'react-icons/fa';
import styles from './navbar.module.css';

// Define TypeScript interfaces for our data structures
interface DropdownItem {
    title: string;
    path: string;
}

interface NavLink {
    title: string;
    path: string;
    icon: ReactElement | null;
    dropdown: boolean;
    dropdownContent?: DropdownItem[];
}

export default function Navbar(): ReactElement {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

    // Handle scroll event to change navbar style when scrolling
    useEffect(() => {
        const handleScroll = (): void => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Toggle mobile menu
    const toggleMobileMenu = (): void => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Toggle dropdown menu
    const toggleDropdown = (index: number): void => {
        if (activeDropdown === index) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(index);
        }
    };

    // Navigation links with dropdown content
    const navLinks: NavLink[] = [
        {
            title: "Home",
            path: "/",
            icon: null,
            dropdown: false
        },
        {
            title: "Feeds",
            path: "/feeds",
            icon: <FaNewspaper />,
            dropdown: true,
            dropdownContent: [
                { title: "Mental Health Tips", path: "/feeds/mental-health-tips" },
                { title: "Campus Events", path: "/feeds/events" },
                { title: "Success Stories", path: "/feeds/success-stories" },
                { title: "Wellness Resources", path: "/feeds/wellness" }
            ]
        },
        {
            title: "Book a Session",
            path: "/book",
            icon: <FaCalendarAlt />,
            dropdown: true,
            dropdownContent: [
                { title: "Individual Counseling", path: "/book/individual" },
                { title: "Group Sessions", path: "/book/group" },
                { title: "Crisis Support", path: "/book/crisis" },
                { title: "Career Guidance", path: "/book/career" }
            ]
        },
        {
            title: "Chats",
            path: "/chats",
            icon: <FaComments />,
            dropdown: false
        },
        {
            title: "Account",
            path: "/account",
            icon: <FaUserCircle />,
            dropdown: true,
            dropdownContent: [
                { title: "Profile", path: "/account/profile" },
                { title: "Appointments", path: "/account/appointments" },
                { title: "Resources", path: "/account/resources" },
                { title: "Settings", path: "/account/settings" }
            ]
        }
    ];

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.navbarContainer}>
                {/* Logo */}
                <div className={styles.logoContainer}>
                    <a href="/" className={styles.logo}>
                        <FaGraduationCap className={styles.logoIcon} />
                        <span className={styles.logoText}>Karu Counselling</span>
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <div className={styles.mobileMenuToggle} onClick={toggleMobileMenu}>
                    <div className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                {/* Nav Links */}
                <div className={`${styles.navLinksContainer} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
                    <ul className={styles.navLinks}>
                        {navLinks.map((link, index) => (
                            <li
                                key={index}
                                className={`${styles.navItem} ${link.dropdown ? styles.hasDropdown : ''}`}
                                onMouseEnter={() => !isMobileMenuOpen && link.dropdown && setActiveDropdown(index)}
                                onMouseLeave={() => !isMobileMenuOpen && link.dropdown && setActiveDropdown(null)}
                            >
                                <a
                                    href={link.path}
                                    className={styles.navLink}
                                    onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                                        if (link.dropdown && isMobileMenuOpen) {
                                            e.preventDefault();
                                            toggleDropdown(index);
                                        }
                                    }}
                                >
                                    {link.icon && <span className={styles.navIcon}>{link.icon}</span>}
                                    {link.title}
                                    {link.dropdown && (
                                        <span className={styles.dropdownIndicator}>
                                            {activeDropdown === index ? <FaChevronUp /> : <FaChevronDown />}
                                        </span>
                                    )}
                                </a>

                                {link.dropdown && link.dropdownContent && (
                                    <div className={`${styles.dropdownMenu} ${activeDropdown === index ? styles.active : ''}`}>
                                        {link.dropdownContent.map((item, itemIndex) => (
                                            <a key={itemIndex} href={item.path} className={styles.dropdownItem}>
                                                {item.title}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Login/Logout Button */}
                    <div className={styles.authContainer}>
                        <a href="/login" className={styles.authButton}>
                            <FaSignInAlt className={styles.authIcon} />
                            <span>Login</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}