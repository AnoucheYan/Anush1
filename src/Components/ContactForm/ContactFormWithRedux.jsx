import React, { useEffect, useRef } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import styles from './contactForm.module.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import actionTypes from '../../Redux/actionTypes';
import { submitMyForm } from '../../Redux/actions';


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

const ContactForm = (props) => {

    const {
        name,
        email,
        message,
        errorMessage
    } = props.myState;

    const {
        changeValues,
        submitFormThunk
    } = props

    // const inputRef = createRef();
    const inputRef = useRef(null);

    // const changeInputValues = (event) => {
    //     props.changeValues(event);
    // }

    const submitForm = () => {
        const dataObj = props.myState;

        delete dataObj.errorMessage;

        for (let key in dataObj) {
            dataObj[key] = dataObj[key].value;
        }

        submitFormThunk(dataObj, props.history);

        // (async () => {
        //     try {
        //         const response = await fetch("http://localhost:3001/form", {
        //             method: "POST",
        //             body: JSON.stringify(dataObj),
        //             headers: {
        //                 "Content-Type": "application/json"
        //             }
        //         })
        //         const data = await response.json();
        //         if (data.error) {
        //             throw data.error;
        //         }
        //         this.props.history.push("/");
        //         this.props.resetForm();
        //     } catch (error) {
        //         // this.setState({
        //         //     errorMessage: error.message
        //         // });
        //         this.props.submitError(error)
        //         console.log(error);
        //     };
        // })();
    }

    // componentDidMount() {
    //     this.inputRef.current.focus();
    // }
    useEffect(() => {
        inputRef.current.focus();
    }, []);//


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
                    ref={!idx ? inputRef : null}
                    onChange={(event) => changeValues(event)}
                    value={props.myState[input.name].value}
                />
                <Form.Text className={styles.errorStyle}>
                    {props.myState[input.name].error}
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
                    onClick={submitForm}
                    disabled={!validated}
                >
                    Submit
                    </Button>
            </Form>
        </Container>
    );
}

const mapStateToProps = (state) => {

    const myState = { ...state.contactFormState };

    return {
        myState
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        changeValues: (event) => {
            dispatch({ type: actionTypes.CHANGE_VALUES, event });
        },
        // submitError: (error) => {
        //     dispatch({ type: actionTypes.SUBMIT_FORM, error });
        // },
        // resetForm: () => {
        //     dispatch({ type: actionTypes.RESET_FORM });
        // },

        //thunk
        submitFormThunk: (dataObj, history) => dispatch(submitMyForm(dataObj, history))
    }
}

const ContactFormWithRedux = connect(mapStateToProps, mapDispatchToProps)(ContactForm);


export default withRouter(ContactFormWithRedux);