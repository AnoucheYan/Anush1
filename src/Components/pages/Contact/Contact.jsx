import React from 'react';
import styles from './contact.module.css';
import ContactForm from '../../ContactForm/ContactForm';


class Contact extends React.Component{
    render () {
        return (
            <div>
                <h1 className = {styles.myColor}>Contact</h1>
                <ContactForm />
            </div>
        )
    }
}


export default Contact;