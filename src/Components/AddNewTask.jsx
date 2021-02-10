import React from 'react';

class AddNewTask extends React.Component {
    
    state = {
        inputValue: ''
    }
    
    hendleChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }
    
    handleReset = () => {
        this.setState ({
            inputValue:''
        })
    }
    
    handleSubmit = (e) => {
        const {onSubmit} = this.props;
        const {inputValue} = this.state;
        onSubmit(inputValue);
    }
      
    render () {
        const {inputValue} = this.state;    
    
        return (
            <div>   
                <div>
                    <input 
                        type = "text"
                        placeholder = "Add new task"
                        onChange = {this.hendleChange}
                        value = {inputValue}
                    ></input>
                    <button 
                        onClick = {this.handleSubmit}
                    >Add</button>
                    <button
                        onClick = {this.handleReset}
                    >Reset
                    </button>
                </div>               
            </div>
        )
    }
}
        
export default AddNewTask;