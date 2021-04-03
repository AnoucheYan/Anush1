import React, { createRef } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import styles from './contactForm.module.css';
import { withRouter } from 'react-router-dom';
// import { required, maxLength, minLength, emailValidation } from '../../helpers/validationFunctions';
import { connect } from 'react-redux';
import actionTypes from '../../Redux/actionTypes';

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
    constructor(props) {
        super(props);
        this.inputRef = createRef();
        // this.state = {
        //     name: {
        //         value: "",
        //         valid: false,
        //         error: null
        //     },
        //     email: {
        //         value: "",
        //         valid: false,
        //         error: null
        //     },
        //     message: {
        //         value: "",
        //         valid: false,
        //         error: null
        //     },
        //     errorMessage: ""
        // }
    }

    changeValues = (event) => {
        // const {name, value} = event.target;

        // let error = "";

        // const maxLength25 = maxLength(25);
        // const maxLength100 = maxLength(100);
        // const minLength2 = minLength(2)

        // switch (name) {
        //     case "name":
        //     case "email":
        //     case "message":
        //         error = required(value) ||
        //             (name === "email" && emailValidation(value)) ||
        //             minLength2(value) ||
        //             (name === "message" ? maxLength100(value) : maxLength25(value));
        //         break;
        //     default: ;
        // }

        // this.setState({
        //     [name]: {
        //         value,
        //         valid: !!!error,
        //         error
        //     }
        // });
        this.props.changeValues(event.target.name, event.target.value);
    }

    submitForm = () => {
        const dataObj = { ...this.state };
        delete dataObj.errorMessage;

        for (let key in dataObj) {
            dataObj[key] = dataObj[key].value;
        }

        (async () => {
            try {
                const response = await fetch("http://localhost:3001/form", {
                    method: "POST",
                    body: JSON.stringify(dataObj),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data = await response.json();
                if (data.error) {
                    throw data.error;
                }
                this.props.history.push("/");
            } catch (error) {
                // this.setState({
                //     errorMessage: error.message
                // });
                this.props.submitError(error)
                console.log(error);
            };
        })();
    }

    componentDidMount() {
        this.inputRef.current.focus();
    }

    render() {
        const { 
            name, 
            email, 
            message, 
            errorMessage,
            changeValues
        } = this.props;

  
        // const {name, email, message, errorMessage} = this.state;
        const validated = name.valid && email.valid && message.valid;

        const inputs = inputsItems.map((input, idx) => {
            return (
                <Form.Group
                    controlId={input.controlId}
                    className={styles.formGroup}
                    key={idx}
                >
                    <Form.Label>{input.label}</Form.Label>
                    <Form.Control
                        name={input.name}
                        type={input.type}
                        placeholder={input.label}
                        as={input.as}
                        rows={input.rows}
                        maxLength={input.maxLength}
                        ref={!idx ? this.inputRef : null}
                        onChange={changeValues}
                        value={this.props[input.name].value}
                    />
                    <Form.Text className={styles.errorStyle}>
                        {this.props[input.name].error}
                    </Form.Text>
                </Form.Group>
            );
        })

        return (
            <Container className={styles.formContainer}>
                <Form onSubmit={(e) => e.preventDefault()}>
                    {inputs}
                    <p className={styles.errorStyle}>
                        {errorMessage}
                    </p>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={this.submitForm}
                        disabled={!validated}
                    >
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.stateForContact.name,
        email: state.stateForContact.email,
        message: state.stateForContact.message,
        errorMessage: state.stateForContact.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeValues: (name, value) => {
            dispatch({ type: actionTypes.CHANGE_VALUES, name, value });
        },
        submitError: (error) => {
            dispatch({ type: actionTypes.SUBMIT_FORM, error});
        }
    }
}

const ContactFormWithRedux = connect(mapStateToProps, mapDispatchToProps)(ContactForm);


export default withRouter(ContactFormWithRedux);