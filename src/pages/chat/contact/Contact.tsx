import styles from "./Contact.module.css";
import { useState } from "react";
import fallbackImage from "../../../assets/karu-logo.jpg";

const Contact = ({ contactsUserName, contactsEuniqueId, handleContactClick }) => {
    const [contactImage, setContactImage] = useState(fallbackImage);

    return (
        <li
            key={contactsEuniqueId}
            className={styles.contactItem}
            onClick={() => handleContactClick(contactsEuniqueId)}
        >
            <img
                src={contactImage}
                alt={contactsUserName}
                className={styles.contactImage}
            />
            <span className={styles.contactName}>{contactsUserName}</span>
        </li>
    );
};

export default Contact;