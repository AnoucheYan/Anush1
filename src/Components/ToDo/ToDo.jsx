import React from 'react';
import AddNewTask from '../AddNewTask';
import Task from '../Task'


class ToDo extends React.Component {
    state = {
        tasks: ["Task 1", "Task 2", "Task 3"],
        inputValue: ''
    }


    hendleCatchValue = (inputValue) => {
        this.setState ({
            inputValue
        });
    }

    render () {
        const {inputValue} = this.state;
        const Tasks = this.state.tasks.map((task, index) => {
            return (
                <Task task = {task} key = {index} />
            )
        })

        return (
            <div>
                <h1>ToDo</h1>
                <div className = "task_wrapper">
                    {Tasks}
                </div>

                <AddNewTask onSubmit = {this.hendleCatchValue} />

                <div>
                    <p> You have type: {inputValue} </p>
                </div>
            
            </div>
        )
    }
}

export default ToDo;