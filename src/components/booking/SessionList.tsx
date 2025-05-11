import { useState } from 'react';
import { FaClock, FaCalendarAlt } from 'react-icons/fa';
import styles from './SessionList.module.css';

interface Counselor {
    name: string;
    image: string;
}

interface Session {
    id: number;
    counselor: Counselor;
    type: string;
    status: 'upcoming' | 'completed' | 'cancelled' | 'pending';
    date: string;
    time: string;
}

interface SessionListProps {
    sessions: Session[];
}

const SessionList: React.FC<SessionListProps> = ({ sessions }) => {
    const [filter, setFilter] = useState<string>('all');

    const filteredSessions = filter === 'all'
        ? sessions
        : sessions.filter(session => session.status === filter);

    return (
        <div className={styles.sessionsContainer}>
            <div className={styles.sessionHeader}>
                <h2 className={styles.sectionTitle}>Your Sessions</h2>
                <div className={styles.sessionFilters}>
                    <button
                        className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`${styles.filterButton} ${filter === 'upcoming' ? styles.active : ''}`}
                        onClick={() => setFilter('upcoming')}
                    >
                        Upcoming
                    </button>
                    <button
                        className={`${styles.filterButton} ${filter === 'pending' ? styles.active : ''}`}
                        onClick={() => setFilter('pending')}
                    >
                        Pending
                    </button>
                    <button
                        className={`${styles.filterButton} ${filter === 'completed' ? styles.active : ''}`}
                        onClick={() => setFilter('completed')}
                    >
                        Completed
                    </button>
                </div>
            </div>

            {filteredSessions.length > 0 ? (
                <div className={styles.sessionsList}>
                    {filteredSessions.map(session => (
                        <div key={session.id} className={styles.sessionItem}>
                            <div className={styles.sessionCounselorInfo}>
                                <img
                                    src={session.counselor.image}
                                    alt={session.counselor.name}
                                    className={styles.sessionCounselorImage}
                                />
                                <div className={styles.sessionTextInfo}>
                                    <h4 className={styles.sessionCounselorName}>{session.counselor.name}</h4>
                                    <p className={styles.sessionType}>{session.type}</p>
                                    <p className={styles.sessionTime}>
                                        <FaClock className={styles.sessionIcon} />
                                        {session.date}, {session.time}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.sessionStatus}>
                <span className={`${styles.statusIndicator} ${styles[session.status]}`}>
                  {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                </span>
                                <div className={styles.sessionActions}>
                                    {session.status === 'upcoming' && (
                                        <>
                                            <button className={`${styles.sessionAction} ${styles.rescheduleButton}`}>
                                                Reschedule
                                            </button>
                                            <button className={`${styles.sessionAction} ${styles.cancelButton}`}>
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                    {session.status === 'pending' && (
                                        <button className={`${styles.sessionAction} ${styles.cancelButton}`}>
                                            Cancel Request
                                        </button>
                                    )}
                                    {session.status === 'completed' && (
                                        <button className={`${styles.sessionAction} ${styles.bookAgainButton}`}>
                                            Book Again
                                        </button>
                                    )}
                                    {session.status === 'cancelled' && (
                                        <button className={`${styles.sessionAction} ${styles.bookAgainButton}`}>
                                            Reschedule
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <FaCalendarAlt className={styles.emptyStateIcon} />
                    <p className={styles.emptyStateText}>You have no {filter !== 'all' ? filter : ''} sessions yet.</p>
                    <button className={styles.emptyStateAction}>Book Your First Session</button>
                </div>
            )}
        </div>
    );
};

export default SessionList;