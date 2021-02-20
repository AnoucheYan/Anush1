import React from 'react';
import AddNewTask from '../AddTask/AddNewTask';
import Task from '../Task/Task';
import styles from './todo.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator';

class ToDo extends React.Component {
    state = {
        tasks :[
            {
                _id: idGenerator(),
                title: 'Task 1'
            },
            {
                _id: idGenerator(),
                title: 'Task 2'
            },
            {
                _id: idGenerator(),
                title: 'Task 3'
            },
        ],
        // removeTasks:[],
        removeTasks: new Set(), //
    }

    handleSubmit = (value) => {
        if(!value) return;
        const tasks = [...this.state.tasks];
        tasks.push (
            {
                _id: idGenerator(),
                title: value
            }
        );
        this.setState ({
            tasks
        });
    }

    handleDelTask = (id) => {
        let tasks = [...this.state.tasks];

        tasks = tasks.filter(item => item._id !== id);

        this.setState({
            tasks
        });
    }

    setRemoveTaskId = (_id) => {
        // let removeTasks = [...this.state.removeTasks];

        // if (removeTasks.includes(_id)) {
        //     removeTasks = removeTasks.filter(id => id !== _id);
        // } else {
        //     removeTasks.push(_id);
        // }

        let removeTasks = new Set (this.state.removeTasks) //

        if (removeTasks.has(_id)) { //
            removeTasks.delete(_id); //
        } else {
            removeTasks.add(_id); //
        }
      
        this.setState ({
            removeTasks
        });
    }

    deleteTasks = () => {
        let tasks = [...this.state.tasks];
        
        // let removeTasks = [...this.state.removeTasks];
        // tasks = tasks.filter(item => !removeTasks.includes(item._id))
        
        let removeTasks = new Set (this.state.removeTasks) //          
        tasks = tasks.filter(item => !removeTasks.has(item._id)) //

        this.setState ({
            tasks,
            // removeTasks:[]
            removeTasks: new Set () //
        });
    }

    render () {
        const {removeTasks} = this.state;
        const Tasks = this.state.tasks.map(task => {
            return (
                <Col key = {task._id} 
                    xs={12} sm={6} md={4} lg={3} 
                    className="d-flex justify-content-center mt-3">
                    <Task
                        task = {task}
                        handleDelTask = {this.handleDelTask}
                        setRemoveTaskId = {this.setRemoveTaskId}
                        // disabled={!!removeTasks.length}
                        disabled={!!removeTasks.size} //
                    />
                </Col>
            )
        })

        return (
            <div>
                <Container>

                    <Row className="justify-content-center mt-4">
                        <Col>
                            <h1 className = {styles.heading}>ToDo</h1>
                            <AddNewTask 
                                handleSubmit = {this.handleSubmit} 
                                // disabled={!!removeTasks.length}
                                disabled={!!removeTasks.size} //
                            />
                        </Col>
                    </Row>

                    <Row className="justify-content-center mt-4">
                        {Tasks}
                    </Row>

                    <Row className="mt-4">
                        <Col>
                            <Button
                                variant = "danger"
                                onClick = {this.deleteTasks}
                                // disabled = {!!!removeTasks.length}
                                disabled = {!!!removeTasks.size} //
                            >
                                Remove
                            </Button>
                        </Col>
                    </Row>

                </Container>
            </div>
        )
    }
}

export default ToDo;