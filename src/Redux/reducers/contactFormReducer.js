import actionTypes from '../actionTypes';
import { required, maxLength, minLength, emailValidation } from '../../helpers/validationFunctions';


const initialState = {
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
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_VALUES: {
            const { name, value } = action.event.target;

            let error = "";

            const maxLength25 = maxLength(25);
            const maxLength100 = maxLength(100);
            const minLength2 = minLength(2)

            switch (name) {
                case "name":
                case "email":
                case "message":
                    error = required(value) ||
                        (name === "email" && emailValidation(value)) ||
                        minLength2(value) ||
                        (name === "message" ? maxLength100(value) : maxLength25(value));
                    break;
                default: ;
            }

            return {
                ...state,
                [name]: {
                    value,
                    valid: !!!error,
                    error
                }
            }
        }
        case actionTypes.SUBMIT_FORM: {
            return {
                ...state,
                errorMessage: action.error.message
            }
        }
        case actionTypes.RESET_FORM: {
            return {
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
        }
        default: return state;
    }
}


export default reducer;