import React from 'react';
import styles from './contact.module.css';
// import ContactForm from '../../ContactForm/ContactForm';
// import ContactFormWithHook from '../../ContactForm/ContactFormWithHook';
// import ContactFormWithContext from '../../ContactForm/ContactFormWithContext';
import ContactForm from '../../ContactForm/ContactFormWithRedux';


const  Contact = () => {
    return (
        <div>
            <h1 className = {styles.myColor}>Contact</h1>
            <ContactForm />
            {/* <ContactFormWithHook /> */}
            {/* <ContactFormWithContext /> */}
        </div>
    );
}


export default Contact;