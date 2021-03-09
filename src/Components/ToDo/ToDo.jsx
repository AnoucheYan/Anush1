import React, { Fragment } from 'react';
import AddNewTaskModal from '../AddNewTaskModal/AddNewTaskModal';
import Task from '../Task/Task';
import styles from './todo.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator';
import Conf from '../Conf/Conf';
import EditTaskModal from'../EditTaskModal/EditTaskModal';

class ToDo extends React.Component {
    state = {
        tasks :[
            {
                _id: idGenerator(),
                title: 'Spring',
                description: 'During springtime, the daylight hours become longer, the sun shines a little stronger, and flowers begin to bloom!'
            },
            {
                _id: idGenerator(),
                title: 'Summer',
                description: 'Summertime’s the hottest season of the year! The days are longer and the sun shines brightly in a clear sky.'
            },
            {
                _id: idGenerator(),
                title: 'Autumn',
                description: 'The days become shorter, leaves start to fall from the trees, and piles of leaves rest on the ground. Also, the temperatures start dropping and it gets a little bit colder every day.'
            },
        ],
        removeTasks: new Set(),
        isAllChecked: false,
        confirmRemoving: false,
        changable: null,
        show: false,
        showHide: false
    }

    handleSubmit = (dataObj) => {
        if(!dataObj.title || !dataObj.description) return;
        const tasks = [...this.state.tasks];
        tasks.push (
            {
                _id: idGenerator(),
                title: dataObj.title,
                description: dataObj.description
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

        let removeTasks = new Set (this.state.removeTasks)

        if (removeTasks.has(_id)) {
            removeTasks.delete(_id);
        } else {
            removeTasks.add(_id);
        }
      
        this.setState ({
            removeTasks
        });
    }

    deleteTasks = () => {
        let tasks = [...this.state.tasks];
        
        let removeTasks = new Set (this.state.removeTasks)          
        tasks = tasks.filter(item => !removeTasks.has(item._id))

        this.setState ({
            tasks,
            removeTasks: new Set (),
            isAllChecked: false
        });
    }

    handleCheck = () => {
        const {tasks, isAllChecked} = this.state;
        let removeTasks = new Set()

        if (!isAllChecked) {
            removeTasks = new Set(this.state.removeTasks);

            tasks.forEach(task => {
                removeTasks.add(task._id)
            });
        }
        
        this.setState ({
            removeTasks,
            isAllChecked: !isAllChecked
        });
    }

    showHideModal = () => {
        this.setState({
            confirmRemoving: !this.state.confirmRemoving
        });
    }

    // setEditTask = (task) => { //
    //     this.setState({
    //         changable: task
    //     });
    // }

    // changableNull = () => { //
    //     this.setState({
    //         changable: null
    //     });
    // }

    showHideEdit = (task) => {
        let show = !this.state.show

        if (show) {
            this.setState ({
                changable: task,
                show
            });
        }

        else {
            this.setState ({
                changable: null,
                show
            });
        };
    }

    openCloseAddTaskModal = () => {
        this.setState({
            showHide: !this.state.showHide
        });
    }

    edit = (changedTask) => {
        const tasks = [...this.state.tasks];
        const index = tasks.findIndex(task => task._id === changedTask._id);
        tasks[index] = changedTask;

        this.setState({
            tasks
        });
    }

    render () {
        const {removeTasks, tasks, isAllChecked, confirmRemoving, changable, show, showHide} = this.state;
        const Tasks = tasks.map(task => {
            return (
                <Col key = {task._id} 
                    xs={12} sm={6} md={4} lg={3} 
                    className="d-flex justify-content-center mt-3">
                    <Task
                        task = {task}
                        handleDelTask = {this.handleDelTask}
                        setRemoveTaskId = {this.setRemoveTaskId}
                        disabled = {!!removeTasks.size} 
                        checked = {removeTasks.has(task._id)}
                        showHideEdit = {this.showHideEdit}
                    />
                </Col>
            )
        })

        return (
            <Fragment>
                <div>
                    <Container>

                        <Row className="justify-content-center mt-4">
                            <Col>
                                <h1 className = {styles.heading}>Seasons</h1>
                                {/* <AddNewTaskModal 
                                    handleSubmit = {this.handleSubmit} 
                                    disabled = {!!removeTasks.size}
                                /> */}
                                <Button 
                                    variant="primary"
                                    onClick={this.openCloseAddTaskModal}
                                >
                                    Add item
                                </Button>
                            </Col>
                        </Row>

                        <Row className="justify-content-center mt-4">
                            {!tasks.length && <div>You have deleted all seasons. You can add seasons again.</div>}
                            {Tasks}
                        </Row>

                        <Row className="mt-4">
                            <Col>
                                <Button
                                    variant = "danger"
                                    disabled = {!!!removeTasks.size}
                                    onClick = {this.showHideModal}
                                >
                                    Remove
                                </Button>
                                
                                <Button
                                    variant = "primary"
                                    className = "ml-3"
                                    onClick = {this.handleCheck}
                                    disabled = {!!!tasks.length}
                                >
                                    {isAllChecked? 'Remove selected' : 'Select all'}
                                </Button>
                            </Col>
                        </Row>

                    </Container>

                    {confirmRemoving && <Conf 
                        onHide = {this.showHideModal}
                        onSubmit = {this.deleteTasks}
                        modalMessage = {`Can I delete ${removeTasks.size} item???`}
                    />}

                    {show && <EditTaskModal
                        changable = {changable}
                        onHide = {this.showHideEdit}
                        onSubmit = {this.edit}
                    />}

                    {showHide && <AddNewTaskModal 
                        onHide = {this.openCloseAddTaskModal}
                        handleSubmit = {this.handleSubmit} 
                        disabled = {!!removeTasks.size}
                    />
                    }
                    
                </div>
            </Fragment>
        )
    }
}

export default ToDo;