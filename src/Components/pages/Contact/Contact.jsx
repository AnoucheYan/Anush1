import React from 'react';
import styles from './contact.module.css'
import ContactForm from '../../ContactForm/ContactFormWithRedux';


const Contact = () => {
    return (
        <div className={styles.myContainer}>
            <h1>Contact</h1>
            <ContactForm />
        </div>
    );
}


export default Contact;