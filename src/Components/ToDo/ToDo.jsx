import React from 'react';
import AddNewTask from '../AddTask/AddNewTask';
import Task from '../Task/Task'
import styles from './todo.module.css'


class ToDo extends React.Component {
    state = {
        tasks: ["Task 1", "Task 2", "Task 3"],
    }

    handleSubmit = (value) => {
        if(!value) return;
        const tasks = [...this.state.tasks];
        tasks.push (value);
        this.setState ({
            tasks
        });
    }

    render () {
        const {tasks} = this.state;
        const Tasks = tasks.map((task, index) => {
            return (
                <Task task = {task} key = {index} />
            )
        })

        return (
            <div>
                <h1 className = {styles.heading}>ToDo</h1>

                <AddNewTask handleSubmit = {this.handleSubmit} />

                <div className = {styles.tasksWrapper}>
                    {Tasks}
                </div>

            </div>
        )
    }
}

export default ToDo;