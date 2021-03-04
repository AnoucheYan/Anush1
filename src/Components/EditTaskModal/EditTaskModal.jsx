import React from 'react';
import {Form, Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

class EditTaskModal extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            ...props.changable
        }
    }

    handleS = ({type, key}) => {
        if(type === 'keypress' && key !== 'Enter') return;

        const {onSubmit, onHide} = this.props;

        onSubmit (this.state);
        onHide ();
    }

    hendleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    render () {
        const {onHide} = this.props;
        const {title, description} = this.state;
        return (
            <Modal
                show = {true}
                onHide = {onHide}
                size = "lg"
                aria-labelledby = "contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id = "contained-modal-title-vcenter">
                        Make your adjustments!!!
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body className="d-flex flex-column align-items-center">
                    <Form.Control
                        type = "text"
                        onChange = {this.hendleChange}
                        value = {title}
                        onKeyPress = {this.handleS}
                        style = {{width:"60%"}}
                        ref = {this.inputRef}
                        name = "title"
                    />

                    <Form.Control 
                        as="textarea"
                        rows={2}
                        style = {{width:"60%", resize:"none"}}
                        className="my-3"
                        name = "description"
                        value = {description}
                        onChange = {this.hendleChange}
                    />
                </Modal.Body>
                
                <Modal.Footer>
                    <Button onClick = {this.handleS}>Save changes</Button>
                    <Button onClick = {onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

EditTaskModal.propTypes = {
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    changable: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }),
}


export default EditTaskModal;