import React from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import isoDate from '../../helpers/IsoDate';


class AddOrEditTaskModal extends React.Component {

    constructor (props) {
        super(props);

        this.inputRef = React.createRef();

        this.state = {
            ...props.changable,
            title: props.changable?props.changable.title:'',
            description: props.changable?props.changable.description:'',
            date: props.changable? new Date(props.changable.date): new Date()   
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

    handleS = ({key, type}) => {
        const {title, description} = this.state;
        const {onSubmit, onHide} = this.props;
        if((type === 'keypress' && key !== 'Enter') || !(!!title || !!description) ) return;

        const dataObj = {...this.state};
        dataObj.date = isoDate(dataObj.date)

        onSubmit (dataObj);
        onHide ();
    }

    setDate = (date) => {
        this.setState({
            date
        });
    }

    render () {
        const {title, description, date} = this.state;
        const {onHide, changable} = this.props;
    
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
                            {changable?"Make Your adjustments":"Add new task!!!"}
                        </Modal.Title>
                    </Modal.Header>
                
                    <Modal.Body className="d-flex flex-column align-items-center">
                        <Form.Control
                            type = "text"
                            placeholder = "Title"
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
                            placeholder = "Description"
                            name = "description"
                            value = {description}
                            onChange = {this.hendleChange}
                        />
                        <DatePicker
                            selected={date} 
                            onChange={date => this.setDate(date)}
                        />
                    </Modal.Body>
                
                    <Modal.Footer>
                        <Button onClick = {this.handleS}
                            disabled = {!(!!title && !!description)}
                        >
                            {changable?"Save changes":"Add task"}
                        </Button>
                        <Button onClick = {onHide}>Close</Button>
                    
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

AddOrEditTaskModal.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    onHide: PropTypes.func.isRequired,
    changable: PropTypes.object
}
        
export default AddOrEditTaskModal;