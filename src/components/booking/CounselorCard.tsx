import { FaCalendarAlt, FaComments } from 'react-icons/fa';
import styles from './CounselorCard.module.css';

interface CounselorProps {
    id: number;
    name: string;
    image: string;
    specialty: string;
    bio: string;
    availability: string;
    onBookSession: (counselorId: number) => void;
    onStartChat: (counselorId: number) => void;
}

const CounselorCard: React.FC<CounselorProps> = ({
                                                     id,
                                                     name,
                                                     image,
                                                     specialty,
                                                     bio,
                                                     availability,
                                                     onBookSession,
                                                     onStartChat
                                                 }) => {
    const handleBookSession = () => {
        onBookSession(id);
    };

    const handleStartChat = () => {
        onStartChat(id);
    };

    return (
        <div className={styles.counselorCard}>
            <img
                src={image}
                alt={name}
                className={styles.counselorImage}
            />
            <div className={styles.counselorInfo}>
                <h3 className={styles.counselorName}>{name}</h3>
                <p className={styles.counselorSpecialty}>{specialty}</p>
                <p className={styles.counselorBio}>{bio}</p>
                <p className={styles.counselorAvailability}>{availability}</p>
                <div className={styles.counselorActions}>
                    <button
                        className={styles.bookButton}
                        onClick={handleBookSession}
                    >
                        <FaCalendarAlt className={styles.buttonIcon} />
                        Book Session
                    </button>
                    <button
                        className={styles.chatButton}
                        onClick={handleStartChat}
                    >
                        <FaComments className={styles.buttonIcon} />
                        Chat Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CounselorCard;