import React, { createRef } from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import styles from './contactForm.module.css'


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

class ContactForm extends React.Component {
    constructor (props) {
        super (props);
        this.inputRef = createRef ();
        this.state = {
            name: "",
            email: "",
            message: ""
        }
    }

    change = (event) => {
        const {name, value} = event.target;
        this.setState ({
            [name]: value
        });
    }

    submitForm = () => {
        (async () => {
            try{
                const response = await fetch("http://localhost:3001/form",{
                    method: "POST",
                    body: JSON.stringify(this.state),
                    headers:{
                        "Content-Type": "application/json"
                    }
                })
                const data = await response.json();
                if (data.error) {
                    throw data.error;
                }
                console.log(data);
            } catch(error) {
                console.log(error);
            };
        })()


    }

    componentDidMount () {
        this.inputRef.current.focus();
    }

    render () {
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
                        ref = {!idx ? this.inputRef : null}
                        onChange = {this.change}
                        value = {this.state[input.name]}
                        required
                    />
                </Form.Group>
            );
        })

        return (
            <Container className = {styles.formContainer}>
                <Form onSubmit = {(e) => e.preventDefault()}>
                    {inputs}
                    <Button 
                        variant = "primary"
                        type = "submit"
                        onClick = {this.submitForm}
                    >
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    }
}


export default ContactForm;