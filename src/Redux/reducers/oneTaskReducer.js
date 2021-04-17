import actionTypes from '../actionTypes';


const initialState = {
    oneTask: null,
    showEditModal: false,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // case actionTypes.CHANGE_LOADING:
        //     return {
        //         ...state,
        //         loading: action.loading
        //     }
        case actionTypes.SET_ONE_TASK:
            return {
                ...state,
                oneTask: action.oneTask
            }
        case actionTypes.OPEN_EDIT_TASK_MODAL:
            return {
                ...state,
                showEditModal: !state.showEditModal
            }       
        default: return state;
    }
}


export default reducer;