import React from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';


class AddNewTaskModal extends React.Component {

    constructor (props) {
        super(props);

        this.inputRef = React.createRef()

        this.state = {
            title: '',
            description:''
        }
    }
        
    hendleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }
    
    componentDidMount () {
        this.inputRef.current.focus();
    }

    render () {
        const {title, description} = this.state;
        const {handleSubmit, onHide} = this.props;

        const handleS = ({key, type}) => {
            if((type === 'keypress' && key !== 'Enter') || !(!!title || !!description) ) return;

            const dataObj = {
                title,
                description
            }

            handleSubmit (dataObj);
            onHide ();
        }
    
        return (
            <div>
                <Modal
                    show = {true}
                    onHide = {onHide}
                    size = "lg"
                    aria-labelledby = "contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id = "contained-modal-title-vcenter">
                            Add new item!!!
                        </Modal.Title>
                    </Modal.Header>
                
                    <Modal.Body className="d-flex flex-column align-items-center">
                        <Form.Control
                            type = "text"
                            placeholder = "Add new task's title"
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
                            placeholder = "Add new task's description"
                            name = "description"
                            value = {description}
                            onChange = {this.hendleChange}
                        />
                    </Modal.Body>
                
                    <Modal.Footer>
                        <Button onClick = {handleS}
                            disabled = {!(!!title && !!description)}
                        >
                            Add item
                        </Button>
                        <Button onClick = {onHide}>Close</Button>
                    
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

AddNewTaskModal.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired
}
        
export default AddNewTaskModal;