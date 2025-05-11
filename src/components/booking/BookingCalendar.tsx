// src/components/booking/BookingCalendar.tsx
import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaArrowLeft, FaArrowRight, FaCheck, FaClock } from 'react-icons/fa';
import styles from './BookingCalendar.module.css';

// Define the time slots
const TIME_SLOTS = [
    { id: 1, start: '9:00', end: '10:00', label: '9:00 - 10:00' },
    { id: 2, start: '10:15', end: '11:15', label: '10:15 - 11:15' },
    { id: 3, start: '11:30', end: '12:30', label: '11:30 - 12:30' },
    { id: 4, start: '14:00', end: '15:00', label: '2:00 - 3:00' },
    { id: 5, start: '15:15', end: '16:15', label: '3:15 - 4:15' },
    { id: 6, start: '16:30', end: '17:00', label: '4:30 - 5:00' }
];

// Days of the week
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

interface TimeSlotAvailability {
    id: number;
    isAvailable: boolean;
    isBooked: boolean;
}

interface DayAvailability {
    date: Date;
    dayName: string;
    dayOfMonth: number;
    slots: TimeSlotAvailability[];
}

interface BookingCalendarProps {
    counselorId: number;
    onBookSlot: (date: Date, slotId: number) => void;
    onClose: () => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ counselorId, onBookSlot, onClose }) => {
    const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
    const [weekDays, setWeekDays] = useState<DayAvailability[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<{ date: Date | null, slotId: number | null }>({ date: null, slotId: null });

    // Mock function to check counselor availability
    const getCounselorAvailability = (counselorId: number, date: Date): boolean[] => {
        // In a real app, this would fetch from an API
        // For demo purposes, we'll make some days/slots available randomly
        const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.

        // Simulate counselor availability based on day of week
        // This is just for demonstration - in a real app you'd fetch this from your backend
        const availabilityMap = {
            1: [true, true, false, true, true, false], // Monday
            2: [false, true, true, false, true, true], // Tuesday
            3: [true, false, true, true, false, true], // Wednesday
            4: [false, true, false, true, true, false], // Thursday
            5: [true, true, true, false, false, true], // Friday
            6: [false, false, false, false, false, false], // Saturday (not available)
            0: [false, false, false, false, false, false], // Sunday (not available)
        };

        return availabilityMap[dayOfWeek as keyof typeof availabilityMap] || Array(6).fill(false);
    };

    // Mock function to check if a slot is already booked
    const isSlotBooked = (counselorId: number, date: Date, slotId: number): boolean => {
        // In a real app, this would fetch from an API
        // For demo purposes, let's say some slots are already booked
        const dateStr = date.toISOString().split('T')[0];

        // Some predefined "booked" slots for demo purposes
        const bookedSlots = [
            { date: '2025-05-12', slotId: 1 }, // Monday, 9:00-10:00
            { date: '2025-05-13', slotId: 3 }, // Tuesday, 11:30-12:30
            { date: '2025-05-14', slotId: 5 }, // Wednesday, 3:15-4:15
        ];

        return bookedSlots.some(slot => slot.date === dateStr && slot.slotId === slotId);
    };

    // Initialize week days
    useEffect(() => {
        const days: DayAvailability[] = [];
        const currentDate = getStartOfWeek(currentWeek);

        // Create 5 weekdays (Monday to Friday)
        for (let i = 0; i < 5; i++) {
            const date = new Date(currentDate);
            date.setDate(date.getDate() + i);

            const availability = getCounselorAvailability(counselorId, date);

            days.push({
                date,
                dayName: DAYS[i],
                dayOfMonth: date.getDate(),
                slots: TIME_SLOTS.map((slot, index) => ({
                    id: slot.id,
                    isAvailable: availability[index],
                    isBooked: isSlotBooked(counselorId, date, slot.id)
                }))
            });
        }

        setWeekDays(days);
    }, [counselorId, currentWeek]);

    // Get the start of the week (Monday)
    const getStartOfWeek = (date: Date): Date => {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
        return new Date(date.setDate(diff));
    };

    // Navigate to previous week
    const goToPreviousWeek = () => {
        const prevWeek = new Date(currentWeek);
        prevWeek.setDate(prevWeek.getDate() - 7);
        setCurrentWeek(prevWeek);
    };

    // Navigate to next week
    const goToNextWeek = () => {
        const nextWeek = new Date(currentWeek);
        nextWeek.setDate(nextWeek.getDate() + 7);
        setCurrentWeek(nextWeek);
    };

    // Format date for display
    const formatDateRange = () => {
        const startDate = getStartOfWeek(currentWeek);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 4); // Monday to Friday

        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
        return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
    };

    // Handle slot click
    const handleSlotClick = (date: Date, slotId: number, isAvailable: boolean, isBooked: boolean) => {
        if (!isAvailable || isBooked) return;

        setSelectedSlot({ date, slotId });
    };

    // Confirm booking
    const handleBooking = () => {
        if (selectedSlot.date && selectedSlot.slotId !== null) {
            onBookSlot(selectedSlot.date, selectedSlot.slotId);
        }
    };

    return (
        <div className={styles.calendarModalOverlay}>
            <div className={styles.calendarModal}>
                <div className={styles.calendarHeader}>
                    <h2>Book a Session</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>

                <div className={styles.calendarNavigation}>
                    <button onClick={goToPreviousWeek} className={styles.navButton}>
                        <FaArrowLeft />
                    </button>
                    <div className={styles.currentWeek}>
                        <FaCalendarAlt className={styles.calendarIcon} />
                        <span>{formatDateRange()}</span>
                    </div>
                    <button onClick={goToNextWeek} className={styles.navButton}>
                        <FaArrowRight />
                    </button>
                </div>

                <div className={styles.calendarGrid}>
                    {/* Time slots column */}
                    <div className={styles.timeLabelsColumn}>
                        {/*<div className={styles.dayHeaderPlaceholder}></div>*/}
                        <div className={styles.dayHeader}>
                            <div className={styles.dayName}>TIME</div>
                            <div className={styles.dayDate}>SLOT</div>
                        </div>
                        {TIME_SLOTS.map(slot => (
                            <div key={slot.id} className={styles.timeLabel}>
                                <FaClock className={styles.timeIcon} />
                                <span>{slot.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Days columns */}
                    {weekDays.map(day => (
                        <div key={day.dayName} className={styles.dayColumn}>
                            <div className={styles.dayHeader}>
                                <div className={styles.dayName}>{day.dayName}</div>
                                <div className={styles.dayDate}>{day.dayOfMonth}</div>
                            </div>

                            {day.slots.map(slot => (
                                <div
                                    key={slot.id}
                                    className={`${styles.timeSlot} 
                                    ${!slot.isAvailable ? styles.unavailable : ''} 
                                    ${slot.isBooked ? styles.booked : ''} 
                                    ${selectedSlot.date && selectedSlot.date.toDateString() === day.date.toDateString() &&
                                    selectedSlot.slotId === slot.id ? styles.selected : ''}`}
                                    onClick={() => handleSlotClick(day.date, slot.id, slot.isAvailable, slot.isBooked)}
                                >
                                    {slot.isBooked ? (
                                        <span className={styles.bookedLabel}>Booked</span>
                                    ) : slot.isAvailable ? (
                                        <span className={styles.availableLabel}>Available</span>
                                    ) : (
                                        <span className={styles.unavailableLabel}>Unavailable</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {selectedSlot.date && selectedSlot.slotId !== null && (
                    <div className={styles.bookingConfirmation}>
                        <div className={styles.selectedSlotInfo}>
                            <p>
                                <strong>Selected Time:</strong> {
                                TIME_SLOTS.find(slot => slot.id === selectedSlot.slotId)?.label
                            }
                            </p>
                            <p>
                                <strong>Date:</strong> {
                                selectedSlot.date.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                            }
                            </p>
                        </div>
                        <button className={styles.bookButton} onClick={handleBooking}>
                            <FaCheck /> Confirm Booking
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingCalendar;