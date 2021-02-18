import React from 'react';
// import styles from './addnewtask.module.css';
import {Button, Form} from 'react-bootstrap';


class AddNewTask extends React.Component {
    
    state = {
        inputValue: ''
    }
    
    hendleChange = (event) => {
        const {value} = event.target;
        this.setState({
            inputValue: value
        })
    }
      
    render () {
        const {inputValue} = this.state;
        const {handleSubmit} = this.props;

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
        
export default AddNewTask;