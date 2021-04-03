import { createStore } from 'redux';
import actionTypes from './actionTypes';
import {required, maxLength, minLength, emailValidation} from '../helpers/validationFunctions';


// const initialState = {
//     counter: 0,
//     inputValue: ""
// };

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         // Counter part
//         case "plus":
//             return {
//                 ...state,
//                 counter: state.counter + 1
//             }
//         case "minus":
//             return {
//                 ...state,
//                 counter: state.counter - 1
//             }
//         case "reset":
//             return {
//                 ...state,
//                 counter: 0
//             }
//         //
//         // Input part
//         case "setInputValue":
//             return {
//                 ...state,
//                 inputValue: action.inputValue
//             }
//         case "clearInput":
//             return {
//                 ...state,
//                 inputValue: ""
//             }
//         //
//         default: return state;
//     }
// }

const initialState = {
    loading: false,
    stateForToDo: {
        tasks: [],
        removeTasks: new Set(),
        isAllChecked: false,
        showHideAddOrEdit: false,
        confirmRemoving: false,
        changableTask: null
    },
    stateForContact: {
        name: {
            value: "",
            valid: false,
            error: null
        },
        email: {
            value: "",
            valid: false,
            error: null
        },
        message: {
            value: "",
            valid: false,
            error: null
        },
        errorMessage: ""
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //Cases for ToDo
        case actionTypes.CHANGE_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case actionTypes.SET_TASKS: {
            return {
                ...state,
                stateForToDo: {
                    ...state.stateForToDo,
                    tasks: action.data
                }
            }
        }
        case actionTypes.ADD_TASK: {
            let tasks = [...state.stateForToDo.tasks];
            tasks.push(action.data);

            return {
                ...state,
                stateForToDo: {
                    ...state.stateForToDo,
                    tasks
                }
            }
        }
        case actionTypes.EDIT_TASK: {
            let tasks = [...state.stateForToDo.tasks];
            const index = tasks.findIndex(task => task._id === action.data._id);
            tasks[index] = action.data;

            return {
                ...state,
                stateForToDo: {
                    ...state.stateForToDo,
                    tasks
                }
            }
        }
        case actionTypes.DEL_ONE_TASK: {
            let tasks = [...state.stateForToDo.tasks];

            tasks = tasks.filter(item => item._id !== action.id);

            return {
                ...state,
                stateForToDo: {
                    ...state.stateForToDo,
                    tasks
                }
            }
        }
        case actionTypes.CHECK_TASK: {
            let removeTasks = new Set(state.stateForToDo.removeTasks)

            if (removeTasks.has(action._id)) {
                removeTasks.delete(action._id);
            } else {
                removeTasks.add(action._id);
            }
            return {
                ...state,
                stateForToDo: {
                    ...state.stateForToDo,
                    removeTasks
                }
            }
        }
        case actionTypes.CHECK_ALL_TASKS: {
            const { tasks, isAllChecked } = state.stateForToDo;

            let removeTasks = new Set()

            if (!isAllChecked) {
                tasks.forEach(task => {
                    removeTasks.add(task._id)
                });
            }

            return {
                ...state,
                stateForToDo: {
                    ...state.stateForToDo,
                    removeTasks,
                    isAllChecked: !isAllChecked
                }
            }
        }
        case actionTypes.DEL_SEL_TASKS: {
            let tasks = [...state.stateForToDo.tasks];
            let removeTasks = new Set(state.stateForToDo.removeTasks);
            tasks = tasks.filter(item => !removeTasks.has(item._id));

            return {
                ...state,
                stateForToDo: {
                    ...state.stateForToDo,
                    tasks,
                    removeTasks: new Set(),
                    isAllChecked: false,
                    confirmRemoving: false
                }
            }
        }
        case actionTypes.OPEN_ADD_OR_EDIT_TASK_MODAL: {
            return {
                ...state,
                stateForToDo: {
                    ...state.stateForToDo,
                    showHideAddOrEdit: !state.stateForToDo.showHideAddOrEdit
                }
            }
        }
        case actionTypes.SHOW_HIDE_DELETE_MODAL: {
            return {
                ...state,
                stateForToDo: {
                    ...state.stateForToDo,
                    confirmRemoving: !state.stateForToDo.confirmRemoving
                }
            }
        }
        case actionTypes.SET_CHANGABLE_TASK: {            
            return {
                ...state,
                stateForToDo: {
                    ...state.stateForToDo,
                    changableTask: action.task
                }
            }
        }


        //Cases for Contact
        case actionTypes.CHANGE_VALUES: {
            // const {name, value}=event.target;
            
            let error = "";
    
            // const maxLength25 = maxLength(25);
            // const maxLength100 = maxLength(100);
            // const minLength2 = minLength(2)
    
            // switch (name) {
            //     case "name":
            //     case "email":
            //     case "message":
            //         error = required(value) ||
            //         (name==="email" && emailValidation(value)) || 
            //         minLength2(value) ||  
            //         (name==="message" ? maxLength100(value) : maxLength25(value));
            //     break;
            //     default:;
            // }

            return {
                ...state,
                stateForContact: {
                    ...state.stateForContact,
                    // [name]: {
                    //     value:action.value,
                    //     valid: !!!action.error,
                    //     error: action.error
                    // }
                }
            }
        }
        case actionTypes.SUBMIT_FORM: {
            return {
                ...state,
                stateForContact: {
                    ...state.stateForContact,
                    errorMessage:action.error.message
                }
            }
        }

        default: return state;
    }
}

const store = createStore(reducer);


export default store;