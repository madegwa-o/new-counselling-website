import CounselorCard from './CounselorCard';
import styles from './CounselorList.module.css';

interface Counselor {
    id: number;
    name: string;
    image: string;
    specialty: string;
    bio: string;
    availability: string;
}

interface CounselorListProps {
    counselors: Counselor[];
    onBookSession: (counselorId: number) => void;
    onStartChat: (counselorId: number) => void;
}

const CounselorList: React.FC<CounselorListProps> = ({
                                                         counselors,
                                                         onBookSession,
                                                         onStartChat
                                                     }) => {
    return (
        <div className={styles.counselorListContainer}>
            <div className={styles.counselorsGrid}>
                {counselors.map(counselor => (
                    <CounselorCard
                        key={counselor.id}
                        id={counselor.id}
                        name={counselor.name}
                        image={counselor.image}
                        specialty={counselor.specialty}
                        bio={counselor.bio}
                        availability={counselor.availability}
                        onBookSession={onBookSession}
                        onStartChat={onStartChat}
                    />
                ))}
            </div>
        </div>
    );
};

export default CounselorList;