import actionTypes from '../actionTypes';


const initialState = {
    loading: false,
    success: "",
    error: ""
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LOADING:
            return {
                ...state,
                loading: action.loading,

                // error: action.loading ? "" : state.error,
                // success: action.loading ? "" : state.success
            }
            case actionTypes.SET_ERROR:
                return {
                    ...state,
                    error: action.error
                }
        default: return state;
    }
}


export default reducer;