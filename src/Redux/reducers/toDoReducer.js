import actionTypes from '../actionTypes';


const initialState = {
    loading: false,
    tasks: [],
    removeTasks: new Set(),
    isAllChecked: false,
    showHideAddOrEdit: false,
    confirmRemoving: false,
    changableTask: null,
    success: "",
    error: ""
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LOADING:
            return {
                ...state,
                loading: action.loading,

                error: action.loading ? "" : state.error,
                success: action.loading ? "" : state.success
            }
        case actionTypes.SET_TASKS: {
            return {
                ...state,
                tasks: action.data
            }
        }
        case actionTypes.ADD_TASK: {
            let tasks = [...state.tasks];
            tasks.push(action.data);

            return {
                ...state,
                tasks,
                showHideAddOrEdit: false,

                success: "You have added new task!"
            }
        }
        case actionTypes.EDIT_TASK: {
            let tasks = [...state.tasks];
            const index = tasks.findIndex(task => task._id === action.data._id);
            tasks[index] = action.data;

            return {
                ...state,
                tasks,
                changableTask: null,

                success: "Successful edited!"
            }
        }
        case actionTypes.DEL_ONE_TASK: {
            let tasks = [...state.tasks];

            tasks = tasks.filter(item => item._id !== action.id);

            return {
                ...state,
                tasks,

                success: "Task was deleted succesfully!!!"
            }
        }
        case actionTypes.CHECK_TASK: {
            let removeTasks = new Set(state.removeTasks)

            if (removeTasks.has(action._id)) {
                removeTasks.delete(action._id);
            } else {
                removeTasks.add(action._id);
            }
            return {
                ...state,
                removeTasks
            }
        }
        case actionTypes.CHECK_ALL_TASKS: {
            const { tasks, isAllChecked } = state;

            let removeTasks = new Set()

            if (!isAllChecked) {
                tasks.forEach(task => {
                    removeTasks.add(task._id)
                });
            }

            return {
                ...state,
                removeTasks,
                isAllChecked: !isAllChecked
            }
        }
        case actionTypes.DEL_SEL_TASKS: {
            let tasks = [...state.tasks];
            let removeTasks = new Set(state.removeTasks);
            tasks = tasks.filter(item => !removeTasks.has(item._id));

            return {
                ...state,
                tasks,
                removeTasks: new Set(),
                isAllChecked: false,
                confirmRemoving: false,

                success: "Tasks were deleted successfully!!!"
            }
        }
        case actionTypes.OPEN_ADD_OR_EDIT_TASK_MODAL: {
            return {
                ...state,
                showHideAddOrEdit: !state.showHideAddOrEdit
            }
        }
        case actionTypes.SHOW_HIDE_DELETE_MODAL: {
            return {
                ...state,
                confirmRemoving: !state.confirmRemoving
            }
        }
        case actionTypes.SET_CHANGABLE_TASK: {
            return {
                ...state,
                changableTask: action.task
            }
        }

        case actionTypes.SET_ERROR:
            return {
                ...state,
                error: action.error
            }

        case actionTypes.CHANGE_STATUS:
            let tasks = [...state.tasks];
            const idx = tasks.findIndex(task => task._id === action.task._id)
            tasks[idx] = action.task
            return {
                ...state,
                tasks
            }
        default: return state;
    }
}


export default reducer;