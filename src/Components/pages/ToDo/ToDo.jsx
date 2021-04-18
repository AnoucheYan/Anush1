import React, { useEffect } from 'react';
import AddOrEditTaskModal from '../../AddOrEditTaskModal/AddOrEditTaskModal';
import Task from '../../Task/Task';
import styles from './todo.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Confirmation from '../../Confirmation/Confirmation';
import isoDate from '../../../helpers/IsoDate';
import Loading from '../../Loading/Loading';
import { connect } from 'react-redux';
import actionTypes from '../../../Redux/actionTypes';
import { setTasks, addTask, editTask, delOneTask, delSelTasks, changeStatus } from '../../../Redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from '../../Search/Search';

const ToDo = (props) => {

    const {
        //state
        loading,
        tasks,
        removeTasks,
        showHideAddOrEdit,
        confirmRemoving,
        changableTask,
        isAllChecked,
        success,
        error,

        //functions
        checkTask,
        openAddOrEditTaskModal,
        checkAllTasks,
        showHideDeleteModal,
        setChangableTask,
        setTasksThunk,
        editTaskThunk,
        delOneTaskThunk,
        delSelTasksThunk,
        changeStatusThunk
    } = props;

    const handleSubmit = (dataObj) => {
        if (!dataObj.title || !dataObj.description) return;
        dataObj.date = isoDate(dataObj.date);

        props.addTaskThunk(dataObj);
    }

    useEffect(() => {
        setTasksThunk();
    }, [setTasksThunk]);

    useEffect(() => {
        error && toast.error(`🦄 ${error}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }, [error]);

    useEffect(() => {
        success && toast.success(`🦄 ${success}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }, [success]);

    const Tasks = tasks.map(task => {
        return (
            <Col key={task._id}
                xs={12} sm={6} md={4} lg={3}
                className="d-flex justify-content-center mt-3">
                <Task
                    task={task}
                    handleDelTask={delOneTaskThunk}
                    setRemoveTaskId={checkTask}
                    disabled={!!removeTasks.size}
                    checked={removeTasks.has(task._id)}
                    setChangableTask={setChangableTask}
                    changeStatusThunk={changeStatusThunk}
                />
            </Col>
        )
    })

    return (
        <>
            <Container>

                <Row>
                    <Col>
                        <Search />
                    </Col>
                </Row>

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
                    onSubmit={() => delSelTasksThunk(removeTasks)}
                    modalMessage={`Can I delete ${removeTasks.size} task???`}
                />
            }

            {
                changableTask && <AddOrEditTaskModal
                    changableTask={changableTask}
                    onHide={setChangableTask}
                    onSubmit={editTaskThunk}
                />
            }

            {
                showHideAddOrEdit && <AddOrEditTaskModal
                    disabled={!!removeTasks.size}
                    onHide={openAddOrEditTaskModal}
                    onSubmit={handleSubmit}
                />
            }

            {
                loading && <Loading />
            }

            {
                <ToastContainer />
            }

        </>
    )
}


const mapStateToProps = (state) => {
    const {
        loading,
        tasks,
        removeTasks,
        isAllChecked,
        showHideAddOrEdit,
        confirmRemoving,
        changableTask,
        success,
        error
    } = state.toDoState;

    return {
        loading,
        tasks,
        removeTasks,
        isAllChecked,
        showHideAddOrEdit,
        confirmRemoving,
        changableTask,
        success,
        error
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        checkTask: (_id) => {
            dispatch({ type: actionTypes.CHECK_TASK, _id });
        },
        checkAllTasks: () => {
            dispatch({ type: actionTypes.CHECK_ALL_TASKS });
        },
        openAddOrEditTaskModal: () => {
            dispatch({ type: actionTypes.OPEN_ADD_OR_EDIT_TASK_MODAL });
        },
        showHideDeleteModal: () => {
            dispatch({ type: actionTypes.SHOW_HIDE_DELETE_MODAL });
        },
        setChangableTask: (task = null) => {
            dispatch({ type: actionTypes.SET_CHANGABLE_TASK, task });
        },

        //thunks
        setTasksThunk: () => dispatch(setTasks()),
        addTaskThunk: (dataObj) => dispatch(addTask(dataObj)),
        editTaskThunk: (changedTask) => dispatch(editTask(changedTask)),
        delOneTaskThunk: (id) => dispatch(delOneTask(id)),
        delSelTasksThunk: (removeTasks) => dispatch(delSelTasks(removeTasks)),

        changeStatusThunk: (task) => dispatch(changeStatus(task))
    }
}

const ToDoWithRedux = connect(mapStateToProps, mapDispatchToProps)(ToDo);


export default ToDoWithRedux;