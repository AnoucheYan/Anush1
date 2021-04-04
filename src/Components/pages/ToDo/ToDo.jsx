import React, { Fragment } from 'react';
import AddOrEditTaskModal from '../../AddOrEditTaskModal/AddOrEditTaskModal';
import Task from '../../Task/Task';
import styles from './todo.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Confirmation from '../../Confirmation/Confirmation';
import isoDate from '../../../helpers/IsoDate';
import Loading from '../../Loading/Loading';
import { connect } from 'react-redux';
import actionTypes from '../../../Redux/actionTypes';


class ToDo extends React.Component {
    // state = {
    // tasks :[],
    // removeTasks: new Set(),
    // isAllChecked: false,
    // confirmRemoving: false,
    // changable: null,
    // showHideAddOrEdit: false,
    // loading: false
    // }

    handleSubmit = (dataObj) => {
        if (!dataObj.title || !dataObj.description) return;
        dataObj.date = isoDate(dataObj.date);

        // this.setState({
        //     loading:true
        // });
        this.props.changeLoading(true);

        // const tasks = [...this.state.tasks];

        fetch("http://localhost:3001/task", {
            method: "POST",
            body: JSON.stringify(dataObj),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                // tasks.push(data);
                this.props.showHideAddOrEdit && this.props.openAddOrEditTaskModal();
                // this.setState({
                //     tasks
                // });
                this.props.addTask(data);
            })
            .catch(error => {
                console.log("error: ", error);
            })
            .finally(() => {
                this.props.changeLoading(false);
                // this.setState({
                //     loading:false
                // });
            });
    }

    handleDelTask = (id) => {
        // this.setState({
        //     loading:true
        // });
        this.props.changeLoading(true);

        fetch("http://localhost:3001/task/" + id, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                // let tasks = [...this.state.tasks];

                // tasks = tasks.filter(item => item._id !== id);

                // this.setState({
                //     tasks
                // });
                this.props.delOneTask(id);
            })
            .catch(error => {
                console.log("error: ", error);
            })
            .finally(() => {
                // this.setState({
                //     loading:false
                // });
                this.props.changeLoading(false);
            });
    }

    // setRemoveTaskId = (_id) => {

    // let removeTasks = new Set(this.state.removeTasks)

    // if (removeTasks.has(_id)) {
    //     removeTasks.delete(_id);
    // } else {
    //     removeTasks.add(_id);
    // }
    // this.setState({
    //     removeTasks
    // });
    // }

    deleteTasks = () => {
        // this.setState({
        //     loading:true
        // });
        this.props.changeLoading(true);

        fetch("http://localhost:3001/task", {
            method: "PATCH",
            body: JSON.stringify({ tasks: Array.from(this.props.removeTasks) }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                // let tasks = [...this.state.tasks];

                // let removeTasks = new Set(this.state.removeTasks);
                // tasks = tasks.filter(item => !removeTasks.has(item._id));

                // this.setState({
                //     tasks,
                //     removeTasks: new Set(),
                //     isAllChecked: false
                // });
                this.props.delSelTasks();
            })
            .catch(error => {
                console.log("error: ", error);
            })
            .finally(() => {
                // this.setState({
                //     loading:false
                // });
                this.props.changeLoading(false);
            });
    }

    // handleCheck = () => {
    // const { tasks, isAllChecked } = this.state;
    // let removeTasks = new Set()

    // if (!isAllChecked) {
    //     removeTasks = new Set(this.state.removeTasks);

    //     tasks.forEach(task => {
    //         removeTasks.add(task._id)
    //     });
    // }

    // this.setState({
    //     removeTasks,
    //     isAllChecked: !isAllChecked
    // });
    // }

    // showHideModal = () => {
    //     this.setState({
    //         confirmRemoving: !this.state.confirmRemoving
    //     });
    // }

    // changableTask = (task) => {
    //     this.setState({
    //         changable: task
    //     });
    // }

    // changableNull = () => {
    //     this.setState({
    //         changable: null
    //     });
    // }

    // openCloseAddTaskModal = () => {
    //     this.setState({
    //         showHideAddOrEdit: !this.state.showHideAddOrEdit
    //     });
    // }

    edit = (changedTask) => {
        // this.setState({
        //     loading:true
        // });
        this.props.changeLoading(true);

        fetch("http://localhost:3001/task/" + changedTask._id, {
            method: "PUT",
            body: JSON.stringify(changedTask),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                // const tasks = [...this.state.tasks];
                // const index = tasks.findIndex(task => task._id === data._id);
                // tasks[index] = data;
                this.props.changableTask && this.props.setChangableTask();
                // this.setState({
                //     tasks,
                // });
                this.props.editTask(data);
            })
            .catch(error => {
                console.log("error: ", error);
            })
            .finally(() => {
                // this.setState({
                //     loading:false
                // });
                this.props.changeLoading(false);
            });
    }

    componentDidMount() {
        // this.setState({
        //     loading: true
        // });
        this.props.changeLoading(true);

        fetch("http://localhost:3001/task")
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                this.props.setTasks(data);
                // this.setState({
                //     tasks: data
                // });
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                // this.setState ({
                //     loading: false
                // });
                this.props.changeLoading(false);
            });
    }

    render() {
        const {
            //state
            loading,
            tasks,
            removeTasks,
            showHideAddOrEdit,
            confirmRemoving,
            changableTask,
            isAllChecked,
            //functions
            checkTask,
            openAddOrEditTaskModal,
            checkAllTasks,
            showHideDeleteModal,
            setChangableTask
        } = this.props;

        const Tasks = tasks.map(task => {
            return (
                <Col key={task._id}
                    xs={12} sm={6} md={4} lg={3}
                    className="d-flex justify-content-center mt-3">
                    <Task
                        task={task}
                        handleDelTask={this.handleDelTask}
                        setRemoveTaskId={checkTask}
                        disabled={!!removeTasks.size}
                        checked={removeTasks.has(task._id)}
                        setChangableTask={setChangableTask}
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
                                <h1 className={styles.heading}>To Do</h1>
                                <Button
                                    variant="primary"
                                    onClick={openAddOrEditTaskModal}
                                >
                                    Add task
                                </Button>
                            </Col>
                        </Row>

                        <Row className="justify-content-center mt-4">
                            {!tasks.length && <div>You havn't any tasks!!!</div>}
                            {Tasks}
                        </Row>

                        <Row className="mt-4">
                            <Col>
                                <Button
                                    variant="danger"
                                    disabled={!!!removeTasks.size}
                                    onClick={showHideDeleteModal}
                                >
                                    Remove
                                </Button>

                                <Button
                                    variant="primary"
                                    className="ml-3"
                                    onClick={checkAllTasks}
                                    disabled={!!!tasks.length}
                                >
                                    {isAllChecked ? 'Remove selected' : 'Select all'}
                                </Button>
                            </Col>
                        </Row>

                    </Container>

                    {
                        confirmRemoving && <Confirmation
                            onHide={showHideDeleteModal}
                            onSubmit={this.deleteTasks}
                            modalMessage={`Can I delete ${removeTasks.size} task???`}
                        />
                    }

                    {
                        changableTask && <AddOrEditTaskModal
                            changableTask={changableTask}
                            onHide={setChangableTask}
                            onSubmit={this.edit}
                        />
                    }

                    {
                        showHideAddOrEdit && <AddOrEditTaskModal
                            disabled={!!removeTasks.size}
                            onHide={openAddOrEditTaskModal}
                            onSubmit={this.handleSubmit}
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


const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        tasks: state.stateForToDo.tasks,
        removeTasks: state.stateForToDo.removeTasks,
        isAllChecked: state.stateForToDo.isAllChecked,
        showHideAddOrEdit: state.stateForToDo.showHideAddOrEdit,
        confirmRemoving: state.stateForToDo.confirmRemoving,
        changableTask: state.stateForToDo.changableTask
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLoading: (loading) => {
            dispatch({ type: actionTypes.CHANGE_LOADING, loading });
        },
        setTasks: (data) => {
            dispatch({ type: actionTypes.SET_TASKS, data });
        },
        addTask: (data) => {
            dispatch({ type: actionTypes.ADD_TASK, data });
        },
        editTask: (data) => {
            dispatch({ type: actionTypes.EDIT_TASK, data });
        },
        delOneTask: (id) => {
            dispatch({ type: actionTypes.DEL_ONE_TASK, id });
        },
        checkTask: (_id) => {
            dispatch({ type: actionTypes.CHECK_TASK, _id });
        },
        checkAllTasks: () => {
            dispatch({ type: actionTypes.CHECK_ALL_TASKS });
        },
        delSelTasks: () => {
            dispatch({ type: actionTypes.DEL_SEL_TASKS });
        },
        openAddOrEditTaskModal: () => {
            dispatch({ type: actionTypes.OPEN_ADD_OR_EDIT_TASK_MODAL });
        },
        showHideDeleteModal: () => {
            dispatch({ type: actionTypes.SHOW_HIDE_DELETE_MODAL });
        },
        setChangableTask: (task = null) => {
            dispatch({ type: actionTypes.SET_CHANGABLE_TASK, task });
        }
    }
}

const ToDoWithRedux = connect(mapStateToProps, mapDispatchToProps)(ToDo);


export default ToDoWithRedux;