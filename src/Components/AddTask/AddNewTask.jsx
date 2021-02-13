import React from 'react';
import styles from './addnewtask.module.css';


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

        const handleS = () => {
            handleSubmit (inputValue)
            this.setState({
                inputValue: ''
            })
        }
    
        return (
            <div>   
                <div> 
                    <input 
                        type = "text"
                        placeholder = "Add new task"
                        onChange = {this.hendleChange}
                        value = {inputValue}
                        className={styles.myInput}
                    ></input>
                    <button 
                        // onClick = {()=>handleSubmit(inputValue)}
                        onClick = {handleS}
                        className={styles.addButton}
                    >Add</button>
                </div>               
            </div>
        )
    }
}
        
export default AddNewTask;