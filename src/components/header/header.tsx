import {
    Sun,
    Moon,
    MessageCircle,      // Muted notifications
    BellPlus
} from 'lucide-react';
import styles from './header.module.css';
import { useTheme } from '../../hooks/themeProvider.tsx';
import image from '../../assets/karu-logo.jpg'

export default function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={styles.container}>
            <div className={styles.headerRow}>
                <div className={styles.right}>
                    <button onClick={toggleTheme} className={styles.themeToggle}>
                        {theme ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <MessageCircle size={24} className={styles.icon} />
                    <BellPlus size={24} className={styles.icon} />

                </div>
            </div>
            <div className={styles.right}>

                <img src={image} alt="logo"/>
            </div>
        </div>
    );
}
