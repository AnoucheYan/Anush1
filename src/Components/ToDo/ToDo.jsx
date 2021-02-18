import React from 'react';
import AddNewTask from '../AddTask/AddNewTask';
import Task from '../Task/Task';
import styles from './todo.module.css';
import { Container, Row, Col } from 'react-bootstrap';
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

    render () {
        const Tasks = this.state.tasks.map(task => {
            return (
                <Col key = {task._id} 
                    xs={12} sm={6} md={4} lg={3} 
                    className="d-flex justify-content-center mt-3">
                    <Task
                        task = {task}
                        handleDelTask = {this.handleDelTask}
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
                            <AddNewTask handleSubmit = {this.handleSubmit} />
                        </Col>
                    </Row>

                    <Row className="justify-content-center mt-4">
                        {Tasks}
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ToDo;