import {useEffect, useState} from 'react';
import {
    FaCalendarAlt,
    FaComments,
    FaUser,
    FaSignOutAlt,
    FaBook,
    FaBell,
    FaCalendarCheck
} from 'react-icons/fa';
import styles from './dashboard.module.css';
import CounselorList from './CounselorList';
import SessionList from './SessionList';
import BookingModal from './BookingModal';
import CounsellorService from '../../services/CounsellorService.js'
import ChatPage from "../../pages/chat/ChatPage.tsx";
import {useAuthentication} from "../../hooks/AuthenticationContext.tsx";
import SessionService from "../../services/SessionService.ts";

type Counselor = [
    id: number,
    firstName: string,
    lastName: string,
    email: string,
]

type User = [
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    program: string,
    year: string,
    emergencyContact: string
]

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

// Sample sessions
const initialSessions = [
    {
        id: 1,
        counselor: {
            id: 1,
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
            id: 2,
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
            id: 3,
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
    const {accessToken,baseUrl} = useAuthentication()
    const [counsellors, setCounsellors] = useState<Counselor[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('sessions');
    const [sessions, setSessions] = useState(initialSessions);
    const [selectedCounselor, setSelectedCounselor] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState<User>({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@students.karu.ac.ke',
        phone: '+254 712 345 678',
        program: 'Bachelor of Psychology',
        year: '3rd Year',
        emergencyContact: '+254 723 456 789',
        emergencyName: 'Jane Doe'
    });

    useEffect(() => {
        const fetchCounsellors = async () => {
            try {
                setLoading(true);
                const data = await CounsellorService.getCounsellors(accessToken);

                // Transform API data format to match our application's format
                const formattedCounsellors = data.map(counsellor => ({
                    id: counsellor.id,
                    name: `${counsellor.firstName} ${counsellor.lastName}`,
                    image: '/api/placeholder/300/180', // Use placeholder image
                    specialty: counsellor.specialization || 'General Counseling',
                    bio: counsellor.bio || 'Professional counselor available to help with various concerns.',
                    availability: counsellor.availability || 'Contact for availability',
                }));

                setCounsellors(formattedCounsellors);
            } catch (error) {
                console.error('Failed to fetch counsellors:', error);
                // Keep fallback data if API fails
            } finally {
                setLoading(false);
            }
        };

        if (accessToken) {
            fetchCounsellors();
        }
    }, [accessToken]);

    const handleLogout = () => {
        // In a real application, handle logout logic here
        alert('Logging out...');
        // Redirect to login page
        // window.location.href = '/login';
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // In a real application, handle account info update
        alert('Account information updated successfully!');
    };

    const handleUserInfoChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBookSession = (counselorId:number) => {
        // Find the selected counselor
        const counselor = counsellors.find((c:Counselor) => c.id === counselorId);
        setSelectedCounselor(counselor);
        setIsBookingModalOpen(true);
    };

    const handleCloseBookingModal = () => {
        setIsBookingModalOpen(false);
    };

    const handleBookingConfirm = (date: Date, timeSlot: string) => {

        const newSession = {
            counselorId: selectedCounselor.id,
            studentId: userInfo.id,
            date: date,
            time: timeSlot
        };

        const respondedSession = SessionService.bookSession(newSession,baseUrl,accessToken);


        // In a real application, you would make an API call to create the booking
        // For now, we'll just add it to our sessions state
        // const newSession = {
        //     id: Math.max(...sessions.map(s => s.id)) + 1,
        //     counselor: {
        //         id: selectedCounselor.id,
        //         name: selectedCounselor.name,
        //         image: selectedCounselor.image.replace('300/180', '80/80'), // Adjust image size
        //     },
        //     type: 'One-on-one counseling',
        //     status: 'pending',
        //     date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        //     time: timeSlot
        // };

        setSessions([newSession, ...sessions]);
        alert('Session booked successfully! The counselor will review your request.');
    };

    const handleStartChat = (counselorId: number) => {
        // In a real application, redirect to chat page or open chat window
        alert(`Starting a chat with counselor #${counselorId}`);
    };

    const handleRescheduleSession = (sessionId:number) => {
        // In a real application, implement reschedule logic
        alert(`Rescheduling session #${sessionId}`);
    };

    const handleCancelSession = (sessionId:number) => {
        // In a real application, implement cancel logic
        // For now, just update the status in our local state
        setSessions(sessions.map(session =>
            session.id === sessionId
                ? { ...session, status: 'cancelled' }
                : session
        ));
        alert(`Session #${sessionId} cancelled`);
    };

    const handleBookAgain = (sessionId: number) => {
        // Find the session
        const session = sessions.find(s => s.id === sessionId);
        if (session) {
            // Find the corresponding counselor
            const counselor = counsellors.find((c) => c.id === session.counselor.id);
            setSelectedCounselor(counselor);
            setIsBookingModalOpen(true);
        }
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
                        className={`${styles.tabItem} ${activeTab === 'chats' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('chats')}
                    >
                        <FaComments className={styles.tabIcon} />
                        <span className={styles.tabText}>Chats </span>
                    </li>
                    <li
                        className={`${styles.tabItem} ${activeTab === 'notifications' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        <FaBell className={styles.tabIcon} />
                        <span className={styles.tabText}>Notifications</span>
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
                        <CounselorList
                            counselors={counsellors}
                            onBookSession={handleBookSession}
                            onStartChat={handleStartChat}
                        />

                        <SessionList
                            sessions={sessions}
                            onReschedule={handleRescheduleSession}
                            onCancel={handleCancelSession}
                            onBookAgain={handleBookAgain}
                        />
                    </div>
                )}

                {activeTab === 'chats' && (
                    <ChatPage />
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

            {/* Booking Modal */}
            {isBookingModalOpen && (
                <BookingModal
                    isOpen={isBookingModalOpen}
                    onClose={handleCloseBookingModal}
                    counselor={selectedCounselor}
                    onBookingConfirm={handleBookingConfirm}
                />
            )}
        </div>
    );
}