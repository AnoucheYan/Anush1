// import actionTypes from '../actionTypes';


const initialState = {
    // ...props.changableTask,
    // title: props.changableTask ? props.changableTask.title : '',
    // description: props.changableTask ? props.changableTask.description : '',
    // date: props.changableTask ? new Date(props.changableTask.date) : new Date(),

    title: '',
    description: '',
    date: new Date(),
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // case actionTypes.: {
        //     return {
        //         ...state,

        //     }
        // }

        default: return state;
    }
}


export default reducer;