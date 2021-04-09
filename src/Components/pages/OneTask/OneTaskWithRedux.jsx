import React, { useEffect } from 'react';
import styles from './oneTask.module.css';
import { Button } from 'react-bootstrap';
import IsoDate from '../../../helpers/IsoDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenAlt } from '@fortawesome/free-solid-svg-icons';
import AddOrEditTaskModal from '../../AddOrEditTaskModal/AddOrEditTaskModal';
import Loading from '../../Loading/Loading';
import { connect } from 'react-redux';
import actionTypes from '../../../Redux/actionTypes';
import { setTask, delTask, changeTask } from '../../../Redux/actions';
import { withRouter } from 'react-router-dom';


const OneTask = (props) => {

    const {
        //state
        oneTask,
        showEditModal,
        loading,
        //functions
        openEditTaskModal,
        setTaskThunk,
        delTaskThunk,
        changeTaskThunk
    } = props;

    useEffect(() => {
        setTaskThunk(props.match.params.id, props.history);
    }, [setTaskThunk, props.match.params.id, props.history]);

    if (!oneTask) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <div className={styles.oneTaskContainer}>
                <div className={styles.oneTask}>
                    <h1>{oneTask.title}</h1>
                    <p>{oneTask.description}</p>
                    <p>Deadline: <span className={styles.date}>{IsoDate(oneTask.date)}</span></p>
                    <p>Created at: <span className={styles.date}>{IsoDate(oneTask.created_at)}</span></p>
                    <p>Updated at: <span className={styles.date}>{IsoDate(oneTask.updated_at)}</span></p>
                    <div className="mt-3">
                        <Button
                            variant="danger"
                            onClick={() => delTaskThunk(props.match.params.id, props.history)}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>

                        <Button
                            className="ml-3"
                            variant="warning"
                            onClick={openEditTaskModal}
                        >
                            <FontAwesomeIcon icon={faPenAlt} />
                        </Button>
                    </div>
                </div>
            </div>
            {
                showEditModal && <AddOrEditTaskModal
                    changable={oneTask}
                    onHide={openEditTaskModal}
                    onSubmit={() => changeTaskThunk(oneTask)}
                />
            }
            {
                loading && <Loading />
            }
        </>
    );
};

const mapStateToProps = (state) => {

    const {
        oneTask,
        showEditModal,
        loading,
    } = state.oneTaskState;

    return {
        oneTask,
        showEditModal,
        loading,
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLoading: (loading) => {
            dispatch({ type: actionTypes.CHANGE_LOADING, loading });
        },
        openEditTaskModal: () => {
            dispatch({ type: actionTypes.OPEN_EDIT_TASK_MODAL });
        },

        //thunks
        setTaskThunk: (id, history) => dispatch(setTask(id, history)),
        delTaskThunk: (id, history) => dispatch(delTask(id, history)),
        changeTaskThunk: (oneTask) => dispatch(changeTask(oneTask))
    }
}

const OneTaskWithRedux = connect(mapStateToProps, mapDispatchToProps)(OneTask);


export default withRouter(OneTaskWithRedux);