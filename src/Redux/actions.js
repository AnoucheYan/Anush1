import actionTypes from './actionTypes';


//ToDo actions
export const setTasks = () => (dispatch) => {
    // this.props.changeLoading(true);
    dispatch({ type: actionTypes.CHANGE_LOADING, loading: true });

    fetch("http://localhost:3001/task")
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw data.error
            }
            // this.props.setTasks(data);
            dispatch({ type: actionTypes.SET_TASKS, data });
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR, error: error.message });
            // console.error(error);
        })
        .finally(() => {
            // this.props.changeLoading(false);
            dispatch({ type: actionTypes.CHANGE_LOADING, loading: false });
        });
}

export const addTask = (dataObj) => (dispatch) => {
    // this.props.changeLoading(true);
    dispatch({ type: actionTypes.CHANGE_LOADING, loading: true });

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
            // this.props.showHideAddOrEdit && this.props.openAddOrEditTaskModal();
            // this.props.addTask(data);
            dispatch({ type: actionTypes.ADD_TASK, data });
        })
        .catch(error => {
            // console.log("error: ", error);
            dispatch({ type: actionTypes.SET_ERROR, error: error.message });
        })
        .finally(() => {
            // this.props.changeLoading(false);
            dispatch({ type: actionTypes.CHANGE_LOADING, loading: false });
        });
}

export const editTask = (changedTask) => (dispatch) => {
    // this.props.changeLoading(true);
    dispatch({ type: actionTypes.CHANGE_LOADING, loading: true });

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
            // this.props.changableTask && this.props.setChangableTask();
            dispatch({ type: actionTypes.EDIT_TASK, data });
            // this.props.editTask(data);
        })
        .catch(error => {
            // console.log("error: ", error);
            dispatch({ type: actionTypes.SET_ERROR, error: error.message });
        })
        .finally(() => {
            // this.props.changeLoading(false);
            dispatch({ type: actionTypes.CHANGE_LOADING, loading: false });
        });
}

export const delOneTask = (id) => (dispatch) => {
    // this.props.changeLoading(true);
    dispatch({ type: actionTypes.CHANGE_LOADING, loading: true });

    fetch("http://localhost:3001/task/" + id, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error
            }
            // this.props.delOneTask(id);
            dispatch({ type: actionTypes.DEL_ONE_TASK, id });
        })
        .catch(error => {
            // console.log("error: ", error);
            dispatch({ type: actionTypes.SET_ERROR, error: error.message });
        })
        .finally(() => {
            // this.props.changeLoading(false);
            dispatch({ type: actionTypes.CHANGE_LOADING, loading: false });
        });
}

export const delSelTasks = (removeTasks) => (dispatch) => {
    // this.props.changeLoading(true);
    dispatch({ type: actionTypes.CHANGE_LOADING, loading: true });

    fetch("http://localhost:3001/task", {
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
            // this.props.delSelTasks();
            dispatch({ type: actionTypes.DEL_SEL_TASKS });
        })
        .catch(error => {
            // console.log("error: ", error);
            dispatch({ type: actionTypes.SET_ERROR, error: error.message });
        })
        .finally(() => {
            // this.props.changeLoading(false);
            dispatch({ type: actionTypes.CHANGE_LOADING, loading: false });
        });
}

export const changeStatus = (task) => (dispatch) => {
    dispatch({ type: actionTypes.CHANGE_LOADING, loading: true });

    const status = task.status === "active" ? "done" : "active";

    fetch(`http://localhost:3001/task/${task._id}`, {
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
    // this.setState({
    //     loading: true
    // })
    dispatch({ type: actionTypes.CHANGE_LOADING, loading: true });

    fetch(`http://localhost:3001/task/${id}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error;
            }
            // this.setState({
            //     oneTask: data
            // });
            dispatch({ type: actionTypes.SET_ONE_TASK, oneTask: data });
        })
        .catch(error => {
            history.push("/404");
            console.log("error: ", error);
        })
        .finally(() => {
            // this.setState({
            //     loading: false
            // })
            dispatch({ type: actionTypes.CHANGE_LOADING, loading: false });
        });
}

export const delTask = (id, history) => (dispatch) => {
    // const { id } = this.props.match.params;

    // this.setState({
    //     loading: true
    // })
    dispatch({ type: actionTypes.CHANGE_LOADING, loading: true });//

    fetch("http://localhost:3001/task/" + id, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error
            }
            // const { history } = this.props;
            history.push('/');
        })
        .catch(error => {
            // this.setState({
            //     loading: false
            // })
            dispatch({ type: actionTypes.CHANGE_LOADING, loading: false });//
            console.log("error: ", error);
        });
}

export const changeTask = (oneTask) => (dispatch) => {
    // this.setState({
    //     loading: true
    // })
    dispatch({ type: actionTypes.CHANGE_LOADING, loading: true });

    fetch("http://localhost:3001/task/" + oneTask._id, {
        method: "PUT",
        body: JSON.stringify(oneTask),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error
            }

            // this.setState({
            //     oneTask: data,
            //     showEditModal: false
            // });
            dispatch({ type: actionTypes.SET_ONE_TASK, oneTask: data });
            dispatch({ type: actionTypes.OPEN_EDIT_TASK_MODAL });
        })
        .catch(error => {
            console.log("error: ", error);
        })
        .finally(() => {
            // this.setState({
            //     loading: false
            // })
            dispatch({ type: actionTypes.CHANGE_LOADING, loading: false });
        });
}