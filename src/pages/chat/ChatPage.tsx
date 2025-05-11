import styles from "./ChatPage.module.css";
import { useWebSocket } from '../../hooks/WebSocketContext.tsx';
import {useEffect, useRef, useState} from "react";
import fallbackImage from "../../assets/karu-logo.jpg";
import Contact from "./contact/Contact.tsx";
import {useAuthentication} from "../../hooks/AuthenticationContext.tsx";
import AuthService from "../../services/AuthService";

const userId = '1'

const ChatPage = () => {
    const {baseUrl} = useAuthentication();
    const {
        messages,
        sendMessage,
        setMessage,
        message,
        contacts,
        selectedUserEuniqueId,
        setSelectedUserEuniqueId,
        fetchAndDisplayUserChat
    } = useWebSocket();
    const [menuOpen, setMenuOpen] = useState(true);
    const messagesEndRef = useRef(null);
    const [contactImage, setContactImage] = useState(fallbackImage);


    const handleContactClick = async (contactId) => {
        setSelectedUserEuniqueId(contactId);
        setMenuOpen(false);
        await fetchAndDisplayUserChat();
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            sendMessage(message);
            setMessage("");
        } else {
            console.warn("Message input is empty!");
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Scroll to bottom whenever messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className={`${styles.container} ${menuOpen ? styles.menuExpanded : ""}`}>
            {/* Toggle Icon */}
            <div className={styles.toggleIcon} onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? "✖" : "☰"}
            </div>


            {/* Contact List */}
            <div
                className={`${styles.usersList} ${
                    menuOpen ? styles.menuOpen : styles.menuClosed
                }`}
            >
                <h2>Chats</h2>
                <ul className={styles.myContacts}>
                    {contacts.map((contact) => (
                        <Contact
                            key={contact.contactsEuniqueId}
                            contactsUserName={contact.contactsUserName}
                            contactsEuniqueId={contact.contactsEuniqueId}
                            handleContactClick={handleContactClick}
                        />
                    ))}
                </ul>
            </div>

            {/* Chat Area */}
            {(selectedUserEuniqueId && messages) ? (
                <div className={styles.chatArea}>
                    <div className={styles.messagesContainer}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`${styles.message} ${
                                    msg.senderEuniqueId === userId
                                        ? styles.senderMessage
                                        : styles.receiverMessage
                                }`}
                            >
                                {msg.content}
                            </div>
                        ))}
                    </div>

                    {/* Message Input Form */}
                    <form className={styles.messageForm} onSubmit={handleFormSubmit}>
                        <div className={styles.messageInputContainer}>
                            <input
                                type="text"
                                value={message}
                                placeholder="Type a message..."
                                onChange={(e) => setMessage(e.target.value)}
                                className={styles.messageInput}
                            />
                            <button type="submit" className={styles.sendButton}>
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className={styles.noChatSelected}>
                    <p>select a counsellor to start chatting.</p>
                </div>
            )}

        </div>
    );
};

export default ChatPage;
