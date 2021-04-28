import actionTypes from './actionTypes';

const API_URL = process.env.REACT_APP_API_URL;


//ToDo actions
export const setTasks = () => (dispatch) => {
    dispatch({ type: actionTypes.CHANGE_LOADING, loading: true });

    fetch(`${API_URL}/task`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw data.error
            }
            dispatch({ type: actionTypes.SET_TASKS, data });
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR, error: error.message });
            console.log(error);
        })
        .finally(() => {
            dispatch({ type: actionTypes.CHANGE_LOADING, loading: false });
        });
}

export const addTask = (dataObj) => (dispatch) => {
    dispatch({ type: actionTypes.CHANGE_LOADING, loading: true });

    fetch(`${API_URL}/task`, {
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
            dispatch({ type: actionTypes.ADD_TASK, data });
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR, error: error.message });
        })
        .finally(() => {
            dispatch({ type: actionTypes.CHANGE_LOADING, loading: false });
        });
}

export const editTask = (changedTask) => (dispatch) => {
    dispatch({ type: actionTypes.CHANGE_LOADING, loading: true });

    fetch(`${API_URL}/task/` + changedTask._id, {
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
            dispatch({ type: actionTypes.EDIT_TASK, data });
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR, error: error.message });
        })
        .finally(() => {
            dispatch({ type: actionTypes.CHANGE_LOADING, loading: false });
        });
}

export const delOneTask = (id) => (dispatch) => {
    dispatch({ type: actionTypes.CHANGE_LOADING, loading: true });

    fetch(`${API_URL}/task/` + id, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error
            }
            dispatch({ type: actionTypes.DEL_ONE_TASK, id });
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR, error: error.message });
        })
        .finally(() => {
            dispatch({ type: actionTypes.CHANGE_LOADING, loading: false });
        });
}

export const delSelTasks = (removeTasks) => (dispatch) => {
    dispatch({ type: actionTypes.CHANGE_LOADING, loading: true });

    fetch(`${API_URL}/task`, {
        method: "PATCH",
        body: JSON.stringify({ tasks: Array.from(removeTasks) }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error
            }
            dispatch({ type: actionTypes.DEL_SEL_TASKS });
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR, error: error.message });
        })
        .finally(() => {
            dispatch({ type: actionTypes.CHANGE_LOADING, loading: false });
        });
}

export const changeStatus = (task) => (dispatch) => {
    dispatch({ type: actionTypes.CHANGE_LOADING, loading: true });

    const status = task.status === "active" ? "done" : "active";

    fetch(`${API_URL}/task/${task._id}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: actionTypes.CHANGE_STATUS, task: data });
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR, error: error.message });
        })
        .finally(() => {
            dispatch({ type: actionTypes.CHANGE_LOADING, loading: false });
        });
}


//OneTask actions
export const setTask = (id, history) => (dispatch) => {
    dispatch({ type: actionTypes.CHANGE_LOADING, loading: true });

    fetch(`${API_URL}/task/${id}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error;
            }
            dispatch({ type: actionTypes.SET_ONE_TASK, oneTask: data });
        })
        .catch(error => {
            history.push("/404");
            console.log("error: ", error);
        })
        .finally(() => {
            dispatch({ type: actionTypes.CHANGE_LOADING, loading: false });
        });
}

export const delTask = (id, history) => (dispatch) => {
    dispatch({ type: actionTypes.CHANGE_LOADING, loading: true });

    fetch(`${API_URL}/task/` + id, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error
            }
            history.push('/');
        })
        .catch(error => {
            dispatch({ type: actionTypes.CHANGE_LOADING, loading: false });
            console.log("error: ", error);
        });
}

export const changeTask = (changableTask) => (dispatch) => {
    dispatch({ type: actionTypes.CHANGE_LOADING, loading: true });

    fetch(`${API_URL}/task/` + changableTask._id, {
        method: "PUT",
        body: JSON.stringify(changableTask),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error
            }
            dispatch({ type: actionTypes.SET_ONE_TASK, oneTask: data });
            dispatch({ type: actionTypes.OPEN_EDIT_TASK_MODAL });
        })
        .catch(error => {
            console.log("error: ", error);
        })
        .finally(() => {
            dispatch({ type: actionTypes.CHANGE_LOADING, loading: false });
        });
}


//Search actions
export const searchAndSortTasks = (backendData) => (dispatch) => {
    dispatch({ type: actionTypes.CHANGE_LOADING, loading: true });

    let q = "?"
    for (let key in backendData) {
        q += key + "=" + backendData[key] + "&";
    }

    fetch(`${API_URL}/task` + q.slice(0, q.length - 1))
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: actionTypes.SET_TASKS, data });
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR, error: error.message });
        })
        .finally(() => {
            dispatch({ type: actionTypes.CHANGE_LOADING, loading: false });
        });
}

export const searchTasks = (backendData) => (dispatch) => {
    dispatch({ type: actionTypes.CHANGE_LOADING, loading: true });

    let q = "?"
    for (let key in backendData) {
        q += key + "=" + backendData[key] + "&";
    }

    fetch(`${API_URL}/task` + q.slice(0, q.length - 1))
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: actionTypes.SET_TASKS, data });
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR, error: error.message });
        })
        .finally(() => {
            dispatch({ type: actionTypes.CHANGE_LOADING, loading: false });
             dispatch({ type: actionTypes.RESET_SEARCH })
        });
}


//ContactForm action
export const submitMyForm = (dataObj, history) => (dispatch) => {
    (async () => {
        try {
            const response = await fetch(`${API_URL}/form`, {
                method: "POST",
                body: JSON.stringify(dataObj),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json();
            if (data.error) {
                throw data.error;
            }
            history.push("/");
            dispatch({ type: actionTypes.RESET_FORM });
        } catch (error) {
            dispatch({ type: actionTypes.SUBMIT_FORM, error });
            console.log(error);
        };
    })();
}