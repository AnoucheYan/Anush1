import React from 'react';
import styles from './contact.module.css';
import ContactForm from '../../ContactForm/ContactFormWithRedux';


const  Contact = () => {
    return (
        <div>
            <h1 className = {styles.myColor}>Contact</h1>
            <ContactForm />
        </div>
    );
}


export default Contact;