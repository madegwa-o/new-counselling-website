import { useState } from 'react';
import {
    FaCalendarAlt,
    FaComments,
    FaUser,
    FaSignOutAlt,
    FaClock,
    FaBook,
    FaBell,
    FaCalendarCheck,
    FaCalendarPlus
} from 'react-icons/fa';
import styles from './dashboard.module.css';
import lec from '../../assets/lec.jpg'

// Counselor data
const counselors = [
    {
        id: 1,
        name: 'Dr. Sarah Johnson',
        image: '/api/placeholder/300/180',
        specialty: 'Anxiety & Depression',
        bio: 'Specializes in helping students overcome anxiety, depression, and academic stress with 10+ years of experience.',
        availability: 'Available: Mon, Wed, Fri',
    },
    {
        id: 2,
        name: 'Prof. Michael Ochieng',
        image:  lec,
        specialty: 'Relationship Counseling',
        bio: 'Expert in interpersonal relationships, conflict resolution, and family dynamics with a focus on cultural sensitivity.',
        availability: 'Available: Tue, Thu',
    },
    {
        id: 3,
        name: 'Dr. Amina Wambui',
        image: '/api/placeholder/300/180',
        specialty: 'Academic Performance & Career',
        bio: 'Helps students navigate academic challenges, career decisions, and personal development with evidence-based approaches.',
        availability: 'Available: Wed, Thu, Fri',
    }
];

// Sample notifications
const notifications = [
    {
        id: 1,
        title: 'Upcoming Session',
        message: 'Your session with Dr. Sarah Johnson is scheduled for tomorrow at 2:00 PM.',
        time: '1 hour ago',
        icon: <FaCalendarCheck />
    },
    {
        id: 2,
        title: 'New Resource Available',
        message: 'Check out our new guide on "Managing Exam Stress" in the resource library.',
        time: '2 days ago',
        icon: <FaBook />
    },
    {
        id: 3,
        title: 'Session Reminder',
        message: 'Don\'t forget your session with Prof. Michael Ochieng on Friday at 10:00 AM.',
        time: '3 days ago',
        icon: <FaBell />
    }
];

// Sample past sessions
const sessions = [
    {
        id: 1,
        counselor: {
            name: 'Dr. Sarah Johnson',
            image: '/api/placeholder/80/80',
        },
        type: 'One-on-one counseling',
        status: 'upcoming',
        date: 'May 15, 2025',
        time: '2:00 PM - 3:00 PM'
    },
    {
        id: 2,
        counselor: {
            name: 'Prof. Michael Ochieng',
            image: '/api/placeholder/80/80',
        },
        type: 'Group therapy session',
        status: 'completed',
        date: 'May 5, 2025',
        time: '10:00 AM - 11:30 AM'
    },
    {
        id: 3,
        counselor: {
            name: 'Dr. Amina Wambui',
            image: '/api/placeholder/80/80',
        },
        type: 'Career counseling',
        status: 'cancelled',
        date: 'April 28, 2025',
        time: '3:30 PM - 4:30 PM'
    }
];

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('sessions');
    const [userInfo, setUserInfo] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@students.karu.ac.ke',
        phone: '+254 712 345 678',
        program: 'Bachelor of Psychology',
        year: '3rd Year',
        emergencyContact: '+254 723 456 789',
        emergencyName: 'Jane Doe'
    });

    const handleLogout = () => {
        // In a real application, handle logout logic here
        alert('Logging out...');
        // Redirect to login page
        // window.location.href = '/login';
    };

    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        // In a real application, handle account info update
        alert('Account information updated successfully!');
    };

    const handleUserInfoChange = (e: any) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBookSession = (counselorId: number) => {
        // In a real application, redirect to booking page or open modal
        alert(`Booking a session with counselor #${counselorId}`);
    };

    const handleStartChat = (counselorId: number) => {
        // In a real application, redirect to chat page or open chat window
        alert(`Starting a chat with counselor #${counselorId}`);
    };

    return (
        <div className={styles.dashboardContainer}>
            <header className={styles.header}>
                <div className={styles.welcomeSection}>
                    <h1 className={styles.welcomeTitle}>Welcome, {userInfo.firstName}!</h1>
                    <p className={styles.welcomeSubtitle}>How can we support you today?</p>
                </div>
            </header>

            <div className={styles.tabsContainer}>
                <ul className={styles.tabsList}>
                    <li
                        className={`${styles.tabItem} ${activeTab === 'sessions' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('sessions')}
                    >
                        <FaCalendarAlt className={styles.tabIcon} />
                        <span className={styles.tabText}>My Sessions</span>
                    </li>
                    <li
                        className={`${styles.tabItem} ${activeTab === 'notifications' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        <FaComments className={styles.tabIcon} />
                        <span className={styles.tabText}>Chats & Notifications</span>
                    </li>
                    <li
                        className={`${styles.tabItem} ${activeTab === 'account' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('account')}
                    >
                        <FaUser className={styles.tabIcon} />
                        <span className={styles.tabText}>My Account</span>
                    </li>
                    <li
                        className={styles.tabItem}
                        onClick={handleLogout}
                    >
                        <FaSignOutAlt className={styles.tabIcon} />
                        <span className={styles.tabText}>Logout</span>
                    </li>
                </ul>
            </div>

            <div className={styles.tabContent}>
                {/* My Sessions Tab */}
                {activeTab === 'sessions' && (
                    <div>
                        <h2>Available Counselors</h2>
                        <div className={styles.counselorsGrid}>
                            {counselors.map(counselor => (
                                <div key={counselor.id} className={styles.counselorCard}>
                                    <img
                                        src={counselor.image}
                                        alt={`${counselor.name}`}
                                        className={styles.counselorImage}
                                    />
                                    <div className={styles.counselorInfo}>
                                        <h3 className={styles.counselorName}>{counselor.name}</h3>
                                        <p className={styles.counselorSpecialty}>{counselor.specialty}</p>
                                        <p className={styles.counselorBio}>{counselor.bio}</p>
                                        <p className={styles.counselorAvailability}>{counselor.availability}</p>
                                        <div className={styles.counselorActions}>
                                            <button
                                                className={styles.bookButton}
                                                onClick={() => handleBookSession(counselor.id)}
                                            >
                                                Book Session
                                            </button>
                                            <button
                                                className={styles.chatButton}
                                                onClick={() => handleStartChat(counselor.id)}
                                            >
                                                Chat Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 style={{ marginTop: '2rem' }}>Your Sessions</h2>
                        {sessions.length > 0 ? (
                            <div className={styles.sessionsList}>
                                {sessions.map(session => (
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
                                                    <FaClock style={{ marginRight: '5px' }} />
                                                    {session.date}, {session.time}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.sessionStatus}>
                      <span className={`${styles.statusIndicator} ${styles[session.status]}`}>
                        {session.status === 'upcoming' && 'Upcoming'}
                          {session.status === 'completed' && 'Completed'}
                          {session.status === 'cancelled' && 'Cancelled'}
                      </span>
                                            <div className={styles.sessionActions}>
                                                {session.status === 'upcoming' && (
                                                    <>
                                                        <button className={`${styles.sessionAction} ${styles.chatButton}`}>
                                                            Reschedule
                                                        </button>
                                                        <button className={`${styles.sessionAction} ${styles.chatButton}`}>
                                                            Cancel
                                                        </button>
                                                    </>
                                                )}
                                                {session.status === 'completed' && (
                                                    <button className={`${styles.sessionAction} ${styles.bookButton}`}>
                                                        Book Again
                                                    </button>
                                                )}
                                                {session.status === 'cancelled' && (
                                                    <button className={`${styles.sessionAction} ${styles.bookButton}`}>
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
                                <FaCalendarPlus className={styles.emptyStateIcon} />
                                <p className={styles.emptyStateText}>You have no scheduled sessions yet.</p>
                                <button className={styles.emptyStateAction}>Book Your First Session</button>
                            </div>
                        )}
                    </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                    <div>
                        <h2>Notifications</h2>
                        {notifications.length > 0 ? (
                            <div className={styles.notificationsList}>
                                {notifications.map(notification => (
                                    <div key={notification.id} className={styles.notificationItem}>
                                        <div className={styles.notificationIcon}>
                                            {notification.icon}
                                        </div>
                                        <div className={styles.notificationContent}>
                                            <h4 className={styles.notificationTitle}>{notification.title}</h4>
                                            <p className={styles.notificationMessage}>{notification.message}</p>
                                            <p className={styles.notificationTime}>{notification.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={styles.emptyState}>
                                <FaBell className={styles.emptyStateIcon} />
                                <p className={styles.emptyStateText}>You have no new notifications.</p>
                                <p>Check back later for updates on your sessions and new resources.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Account Tab */}
                {activeTab === 'account' && (
                    <div className={styles.accountSection}>
                        <h2 className={styles.accountSectionTitle}>Personal Information</h2>
                        <form className={styles.accountForm} onSubmit={handleFormSubmit}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>First Name</label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    name="firstName"
                                    value={userInfo.firstName}
                                    onChange={handleUserInfoChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Last Name</label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    name="lastName"
                                    value={userInfo.lastName}
                                    onChange={handleUserInfoChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Email Address</label>
                                <input
                                    type="email"
                                    className={styles.formInput}
                                    name="email"
                                    value={userInfo.email}
                                    onChange={handleUserInfoChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Phone Number</label>
                                <input
                                    type="tel"
                                    className={styles.formInput}
                                    name="phone"
                                    value={userInfo.phone}
                                    onChange={handleUserInfoChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Program</label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    name="program"
                                    value={userInfo.program}
                                    onChange={handleUserInfoChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Year of Study</label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    name="year"
                                    value={userInfo.year}
                                    onChange={handleUserInfoChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Emergency Contact Name</label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    name="emergencyName"
                                    value={userInfo.emergencyName}
                                    onChange={handleUserInfoChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Emergency Contact Number</label>
                                <input
                                    type="tel"
                                    className={styles.formInput}
                                    name="emergencyContact"
                                    value={userInfo.emergencyContact}
                                    onChange={handleUserInfoChange}
                                />
                            </div>
                            <button type="submit" className={styles.formSubmit}>
                                Save Changes
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}