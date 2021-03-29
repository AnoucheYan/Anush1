import React, { useReducer, useEffect } from 'react';
import styles from './oneTask.module.css';
import IsoDate from '../../../helpers/IsoDate';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenAlt } from '@fortawesome/free-solid-svg-icons';
import AddOrEditTaskModal from '../../AddOrEditTaskModal/AddOrEditTaskModal';
import Loading from '../../Loading/Loading';


const initialState = {
    oneTask: null,
    showEditModal: false,
    loading: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case "showHideEditModal":
            return {
                ...state,
                showEditModal: !state.showEditModal
            }
        case "load":
            return {
                ...state,
                loading: action.loading
            }
        case "setOneTask":
            return {
                ...state,
                oneTask: action.data
            }
        default:
            throw new Error();
    }
}

const OneTaskWithReducterHook = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const { id } = props.match.params;

        dispatch({ type: "load", loading: true })

        fetch(`http://localhost:3001/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                dispatch({ type: "setOneTask", data });
            })
            .catch(error => {
                props.history.push("/404");
                console.log("error: ", error);
            })
            .finally(() => {
                dispatch({ type: "load", loading: false })
            });
    }, [props.history, props.match.params])

    const goBack = () => {
        props.history.push('/')
    }

    const DeleteOneTask = () => {

        dispatch({ type: "load", loading: true });

        const { id } = props.match.params;

        fetch("http://localhost:3001/task/" + id, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }

                props.history.push('/')
            })
            .catch(error => {
                dispatch({ type: "load", loading: false })
                console.log("error: ", error);
            });
    }

    const edit = (dataObj) => {
        dispatch({ type: "load", loading: true });

        fetch("http://localhost:3001/task/" + dataObj._id, {
            method: "PUT",
            body: JSON.stringify(dataObj),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }

                dispatch({ type: "setOneTask", data });
                dispatch({ type: "showHideEditModal" });
            })
            .catch(error => {
                console.log("error: ", error);
            })
            .finally(() => {
                dispatch({ type: "load", loading: false })
            });
    }

    const { oneTask, showEditModal, loading } = state;

    if (!oneTask) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <div className={styles.oneTaskContainer}>
                <div className={styles.oneTask}>
                    <Button onClick={goBack}>
                        Back
                    </Button>
                    <h1>{oneTask.title}</h1>
                    <p>{oneTask.description}</p>
                    <p>Deadline: <span className={styles.date}>{IsoDate(oneTask.date)}</span></p>
                    <p>Created at: <span className={styles.date}>{IsoDate(oneTask.created_at)}</span></p>
                    <p>Updated at: <span className={styles.date}>{IsoDate(oneTask.updated_at)}</span></p>
                    <div className="mt-3">
                        <Button
                            variant="danger"
                            onClick={() => DeleteOneTask()}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>

                        <Button
                            className="ml-3"
                            variant="warning"
                            onClick={() => dispatch({ type: "showHideEditModal" })}
                        >
                            <FontAwesomeIcon icon={faPenAlt} />
                        </Button>
                    </div>
                </div>
            </div>

            {
                showEditModal && <AddOrEditTaskModal
                    changable={oneTask}
                    onHide={() => dispatch({ type: "showHideEditModal" })}
                    onSubmit={edit}
                />
            }
            {
                loading && <Loading />
            }
        </>
    )
}


export default OneTaskWithReducterHook;