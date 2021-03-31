import { createStore } from 'redux';


const initialState = {
    counter: 0,
    inputValue: ""
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // Counter part
        case "plus":
            return {
                ...state,
                counter: state.counter + 1
            }
        case "minus":
            return {
                ...state,
                counter: state.counter - 1
            }
        case "reset":
            return {
                ...state,
                counter: 0
            }
        //
        // Input part
        case "setInputValue":
            return {
                ...state,
                inputValue: action.inputValue
            }
        case "clearInput":
            return {
                ...state,
                inputValue: ""
            }
        //
        default: return state;
    }
}

const store = createStore(reducer);


export default store;