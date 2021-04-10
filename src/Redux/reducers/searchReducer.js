import actionTypes from '../actionTypes';


const initialState = {
    search: "",
    status: null,
    sort: null,
    create_lte: "",
    create_gte: "",
    complete_lte: "",
    complete_gte: ""
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_DROPDOWN_VALUE:
            const { value, dropDown } = action;
            return {
                ...state,
                [dropDown]: value
            }
        case actionTypes.CHANGE_SEARCH:
            return {
                ...state,
                search: action.value
            }
        case actionTypes.SET_DATE:
            const { dateType, date } = action
            return {
                ...state,
                [dateType]: date
            }
        case actionTypes.RESET_SEARCH:
            return {
                ...initialState
            }

        default: return state;
    }
}


export default reducer;