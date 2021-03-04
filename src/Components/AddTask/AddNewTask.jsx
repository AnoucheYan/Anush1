import React from 'react';
// import styles from './addnewtask.module.css';
import {Button, Form} from 'react-bootstrap';
import PropTypes from 'prop-types';


class AddNewTask extends React.Component {

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
        const {handleSubmit, disabled} = this.props;

        const handleS = ({key, type}) => {
            if(type === 'keypress' && key !== 'Enter') return;

            const dataObj = {
                title,
                description
            }

            handleSubmit (dataObj)
            this.setState({
                title: '',
                description: ''
            })
        }
    
        return (
            <div>   
                <div className="d-flex flex-column align-items-center"> 
                    <Form.Control
                        type = "text"
                        placeholder = "Add new task's title"
                        onChange = {this.hendleChange}
                        value = {title}
                        onKeyPress = {handleS}
                        style = {{width:"60%"}}
                        disabled = {disabled}
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
                        disabled = {disabled}
                    />

                    <div>
                        <Button
                            className="d-block"
                            variant = "primary"
                            onClick = {handleS}
                            disabled = {!(!!title && !!description)}
                        >Add
                        </Button>
                    </div>
                </div>               
            </div>
        )
    }
}

AddNewTask.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}
        
export default AddNewTask;