import React from 'react';
// import styles from './addnewtask.module.css';
import {Button, Form} from 'react-bootstrap';
import PropTypes from 'prop-types';


class AddNewTask extends React.Component {

    constructor (props) {
        super(props);

        this.inputRef = React.createRef()

        this.state = {
            inputValue: ''
        }
    }
        
    hendleChange = (event) => {
        const {value} = event.target;
        this.setState({
            inputValue: value
        })
    }
    
    componentDidMount () {
        this.inputRef.current.focus();
    }

    render () {
        const {inputValue} = this.state;
        const {handleSubmit, disabled} = this.props;

        const handleS = ({key, type}) => {
            if(type === 'keypress' && key !== 'Enter') return;

            handleSubmit (inputValue)
            this.setState({
                inputValue: ''
            })
        }
    
        return (
            <div>   
                <div className="d-flex justify-content-center"> 
                    <Form.Control
                        type = "text"
                        placeholder = "Add new task"
                        onChange = {this.hendleChange}
                        value = {inputValue}
                        onKeyPress = {handleS}
                        style = {{width:"60%"}}
                        disabled = {disabled}
                        ref = {this.inputRef}
                    />
                    <Button
                        className="d-block"
                        variant = "primary"
                        onClick = {handleS}
                        disabled = {!!!inputValue}
                    >Add
                    </Button>
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