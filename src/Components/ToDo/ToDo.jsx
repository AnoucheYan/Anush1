import React from 'react';
import Task from '../Task'

class ToDo extends React.Component{
state={
    tasks: ["Task 1", "Task 2", "Task 3"]
}


    render(){
        const {tasks}=this.state;
        const Tasks=this.state.tasks.map((task, index) =>{
            return(
                <Task task = {task} key = {index} />
            )
        })


        return(
            <div>
                <h1>ToDo</h1>
                <div className= "task_wrapper">
                    {Tasks}
                </div>

                <div>
                    <input 
                        type="text"
                        placeholder="Add new task"
                    ></input>
                    <button>Add</button>
                </div>
            
            </div>
        )
    }
}



export default ToDo;