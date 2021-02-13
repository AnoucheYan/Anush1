import React from 'react';
import AddNewTask from '../AddTask/AddNewTask';
import Task from '../Task/Task';
import styles from './todo.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator';

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
        const Tasks = this.state.tasks.map((task, {index=idGenerator()}) => {
            return (
                <Col key = {index} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center mt-3">
                    <Task
                        task = {task} 
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