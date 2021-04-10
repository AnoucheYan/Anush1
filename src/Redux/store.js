import { createStore, applyMiddleware, combineReducers } from 'redux';
import toDoReducer from './reducers/toDoReducer';
import contactFormReducer from './reducers/contactFormReducer';
import oneTaskReducer from './reducers/oneTaskReducer';
import searchReducer from './reducers/searchReducer';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';


const reducers = combineReducers({
    toDoState: toDoReducer,
    contactFormState: contactFormReducer,
    oneTaskState: oneTaskReducer,
    searchState: searchReducer
});

// const middlewares = [thunk, logger];

// const store = createStore(reducers, applyMiddleware(...middlewares));
const store = createStore(reducers, applyMiddleware(thunk));


export default store;