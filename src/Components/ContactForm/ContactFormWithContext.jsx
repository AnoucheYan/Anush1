import React, {useContext, useEffect, useRef} from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import styles from './contactForm.module.css';
import {withRouter} from 'react-router-dom';
import {ContactContext} from '../../Context/ContactContext';


const inputsItems = [
    {
        name: "name",
        controlId: "formBasicName",
        label: "Name",
        type: "text",
    },
    {
        name: "email",
        controlId: "formBasicEmail",
        label: "Email",
        type: "email",
    },
    {
        name: "message",
        controlId: "textarea",
        label: "Message",
        as: "textarea",
        rows: 3,
        maxLength: 100
    }
]

const ContactFormWithContext = () => {

    // focus on name input after loading the page
    const inputRef = useRef (null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    //

    const context = useContext(ContactContext); // calling context
    
    const {dataObj, errorMessage, change, submitForm} = context; // taking useful elements from context

    const {name, email, message} = dataObj;

    const validated = name.valid && email.valid && message.valid;

    const inputs = inputsItems.map((input, idx) => {
        return (
            <Form.Group 
                controlId = {input.controlId} 
                className = {styles.formGroup}
                key = {idx}
            >
                <Form.Label>{input.label}</Form.Label>
                <Form.Control
                    name = {input.name}
                    type = {input.type}
                    placeholder = {input.label}
                    as = {input.as}
                    rows = {input.rows}
                    maxLength = {input.maxLength}
                    ref = {!idx ? inputRef : null}
                    onChange = {change}
                    value = {dataObj[input.name].value}
                />
                <Form.Text className = {styles.errorStyle}>
                    {dataObj[input.name].error}
                </Form.Text>
            </Form.Group>
        );
    })

    return (
        <Container className = {styles.formContainer}>
            <Form onSubmit = {(e) => e.preventDefault()}>
                {inputs}
                <p className = {styles.errorStyle}>
                    {errorMessage}
                </p>
                <Button 
                    variant = "primary"
                    type = "submit"
                    onClick = {submitForm}
                    disabled = {!validated}
                >
                    Submit
                </Button>
            </Form>
        </Container>
    );
}


export default withRouter(ContactFormWithContext);