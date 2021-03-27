import React, {useState, useEffect, useRef } from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import styles from './contactForm.module.css';
import {withRouter} from 'react-router-dom';
import {required, maxLength, minLength, emailValidation} from '../../helpers/validationFunctions';


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

const ContactFormWithHook = (props) => {
    //Creating states for inputs and errors
    const [dataObj, setDataObj] = useState ({
        name: {
            value: "",
            valid: false,
            error: null
        },
        email: {
            value: "",
            valid: false,
            error: null
        },
        message: {
            value: "",
            valid: false,
            error: null
        }
    });

    const [errorMessage,setErrorMessage] = useState(""); //

    // focus on name input after loading the page
    const inputRef = useRef (null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);//

    const change = (event) => {
        const {name, value} = event.target;

        let error = "";

        const maxLength25 = maxLength(25);
        const maxLength100 = maxLength(100);
        const minLength2 = minLength(2)

        switch (name) {
            case "name":
            case "email":
            case "message":
                error = required(value) ||
                (name==="email" && emailValidation(value)) || 
                minLength2(value) ||  
                (name==="message" ? maxLength100(value) : maxLength25(value));
            break;
            default:;
        }
        
        //changing dataObj hook's state
        setDataObj({
            ...dataObj,
            [name]: {
                value,
                valid: !!!error,
                error
            }
        });//
    }

    const submitForm = () => {
        
        const copyDataObj = {...dataObj} //copying datas from dataObj hook

        for (let key in copyDataObj) {
            copyDataObj[key] = copyDataObj[key].value;
        }

        (async () => {
            try{
                const response = await fetch("http://localhost:3001/form",{
                    method: "POST",
                    body: JSON.stringify(copyDataObj),
                    headers:{
                        "Content-Type": "application/json"
                    }
                })
                const data = await response.json();
                if (data.error) {
                    throw data.error;
                }
                
                props.history.push("/");
            } catch(error) {
                setErrorMessage(error.message); //changing errorMessage hook's state
                console.log(error);
            };
        })();
    }

    const validated = dataObj.name.valid && dataObj.email.valid && dataObj.message.valid;

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
    });

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


export default withRouter(ContactFormWithHook);