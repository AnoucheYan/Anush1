import React from 'react';
import {Form, Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

class EditOrAddItemModal extends React.Component{
    constructor (props) {
        super(props);

        this.inputRef = React.createRef()

        const {action} = this.props;

        if (action === "edit") {
            this.state = {
                ...props.changable,                
            }
        }
        else if(action === "add") {
            this.state = {
                title: '',
                description:''
            }
        };

    }

    handleS = ({type, key}) => {
        const {title, description} = this.state;
        
        if((type === 'keypress' && key !== 'Enter') || !(!!title || !!description)) return;

        const {editSubmit, onHide, addSubmit, action} = this.props;

        if (action === "add") {

            const dataObj = {
                title,
                description
            }

            addSubmit (dataObj);
        }
        else if (action === "edit") {
            editSubmit (this.state);
        }

        onHide ();
    }

    componentDidMount () {
        
        if (this.props.action === "add") {
            this.inputRef.current.focus();
        }
    }

    hendleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    render () {
        const {onHide, modalHeading, buttonText} = this.props;
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
                        {modalHeading}
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body className="d-flex flex-column align-items-center">
                    <Form.Control
                        type = "text"
                        placeholder = "Add new item's title"
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
                        placeholder = "Add new item's description"
                        name = "description"
                        value = {description}
                        onChange = {this.hendleChange}
                    />
                </Modal.Body>
                
                <Modal.Footer>
                    <Button 
                        onClick = {this.handleS}
                        disabled = {!(!!title && !!description)}
                    >
                        {buttonText}
                    </Button>
                    <Button
                        onClick = {onHide}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

EditOrAddItemModal.propTypes = {
    onHide: PropTypes.func.isRequired,
    editSubmit: PropTypes.func.isRequired,
    addSubmit: PropTypes.func.isRequired,
    changable: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }),
    modalHeading: PropTypes.string,
    buttonText: PropTypes.string,
    action: PropTypes.string,
    myClick: PropTypes.func.isRequired
}


export default EditOrAddItemModal;