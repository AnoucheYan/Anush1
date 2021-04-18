import { createStore, applyMiddleware, combineReducers } from 'redux';
import toDoReducer from './reducers/toDoReducer';
import contactFormReducer from './reducers/contactFormReducer';
import oneTaskReducer from './reducers/oneTaskReducer';
import searchReducer from './reducers/searchReducer';
import addOrEditTaskModalReducer from './reducers/addOrEditTaskModalReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


const reducers = combineReducers({
    toDoState: toDoReducer,
    contactFormState: contactFormReducer,
    oneTaskState: oneTaskReducer,
    searchState: searchReducer,
    addOrEditTaskModalState:addOrEditTaskModalReducer
});

let middlewares

if (process.env.NODE_ENV==="development"){
    middlewares = [thunk, logger];
} else if(process.env.NODE_ENV==="production"){
    middlewares = [thunk];
}

const store = createStore(reducers, applyMiddleware(...middlewares));


export default store;