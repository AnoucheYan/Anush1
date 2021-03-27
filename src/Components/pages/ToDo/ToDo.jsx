import React, { Fragment } from 'react';
import AddOrEditTaskModal from '../../AddOrEditTaskModal/AddOrEditTaskModal';
import Task from '../../Task/Task';
import styles from './todo.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Confirmation from '../../Confirmation/Confirmation';
import isoDate from '../../../helpers/IsoDate';
import Loading from '../../Loading/Loading';


class ToDo extends React.Component {
    state = {
        tasks :[],
        removeTasks: new Set(),
        isAllChecked: false,
        confirmRemoving: false,
        changable: null,
        showHideAddOrEdit: false,
        loading: false
    }

    handleSubmit = (dataObj) => {
        if(!dataObj.title || !dataObj.description) return;
        dataObj.date = isoDate(dataObj.date);

        this.setState({
            loading:true
        });

        const tasks = [...this.state.tasks];      

        fetch("http://localhost:3001/task",{
            method: "POST",
            body: JSON.stringify(dataObj),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) {
                throw data.error;
            }
            tasks.push(data);
            this.state.showHideAddOrEdit && this.openCloseAddTaskModal();
            this.setState ({
                tasks
            });
        })
        .catch(error => {
            console.log("error: ",error);
        })
        .finally(() => {
            this.setState({
                loading:false
            });
        });
    }

    handleDelTask = (id) => {
        this.setState({
            loading:true
        });
        
        fetch("http://localhost:3001/task/"+id,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                throw data.error
            }
            let tasks = [...this.state.tasks];

            tasks = tasks.filter(item => item._id !== id);
    
            this.setState({
                tasks
            });            
        })
        .catch(error => {
            console.log("error: ",error);
        })
        .finally(() => {
            this.setState({
                loading:false
            });
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
        this.setState({
            loading:true
        });

        fetch("http://localhost:3001/task",{
            method: "PATCH",
            body: JSON.stringify({tasks:Array.from(this.state.removeTasks)}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) {
                throw data.error
            }
            let tasks = [...this.state.tasks];
        
            let removeTasks = new Set (this.state.removeTasks)          
            tasks = tasks.filter(item => !removeTasks.has(item._id))
    
            this.setState ({
                tasks,
                removeTasks: new Set (),
                isAllChecked: false
            });
        })
        .catch(error => {
            console.log("error: ",error);
        })
        .finally(() => {
            this.setState({
                loading:false
            });
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

    changableTask = (task) => {
        this.setState({
            changable: task
        });
    }
    changableNull = () => {
        this.setState({
            changable: null
        });
    }

    openCloseAddTaskModal = () => {
        this.setState({
            showHideAddOrEdit: !this.state.showHideAddOrEdit
        });
    }

    edit = (changedTask) => {
        this.setState({
            loading:true
        });

        fetch("http://localhost:3001/task/" + changedTask._id, {
            method: "PUT",
            body: JSON.stringify(changedTask),
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) {
                throw data.error
            }
            const tasks = [...this.state.tasks];
            const index = tasks.findIndex(task => task._id === data._id);
            tasks[index] = data;
            this.state.changable && this.changableNull();
            this.setState({
                tasks,
            });
        })
        .catch(error =>{
            console.log("error: ",error);
        })
        .finally(() => {
            this.setState({
                loading:false
            });
        });
    }

    componentDidMount () {
        this.setState({
            loading: true
        })

        fetch("http://localhost:3001/task")
        .then(response => response.json())
        .then(data => {
            if(data.error){
                throw data.error
            }
            this.setState({
                tasks: data
            });
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            this.setState ({
                loading: false
            });
        });
    }

    render () {
        const {removeTasks, tasks, isAllChecked, confirmRemoving, changable, showHideAddOrEdit, loading} = this.state;

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
                        changableTask = {this.changableTask}
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
                                <h1 className = {styles.heading}>To Do</h1>
                                <Button 
                                    variant="primary"
                                    onClick={this.openCloseAddTaskModal}
                                >
                                    Add task
                                </Button>
                            </Col>
                        </Row>

                        <Row className="justify-content-center mt-4">
                            {!tasks.length && <div>You have deleted all tasks. You can add tasks again.</div>}
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

                    {
                        confirmRemoving && <Confirmation
                            onHide = {this.showHideModal}
                            onSubmit = {this.deleteTasks}
                            modalMessage = {`Can I delete ${removeTasks.size} task???`}
                        />
                    }

                    {
                        changable  && <AddOrEditTaskModal 
                            changable = {changable}
                            onHide = {this.changableNull}
                            onSubmit = {this.edit}
                        />
                    }

                    {
                    showHideAddOrEdit && <AddOrEditTaskModal 
                            disabled = {!!removeTasks.size}
                            onHide = {this.openCloseAddTaskModal}
                            onSubmit = {this.handleSubmit}
                        />
                    }

                    {
                        loading && <Loading />
                    }
                    
                </div>
            </Fragment>
        )
    }
}

export default ToDo;