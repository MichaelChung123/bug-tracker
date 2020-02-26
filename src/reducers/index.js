import counterReducer from './counter';
import loggedReducer from './isLogged';
import crossedReducer from './isCrossed';
import { combineReducers } from 'redux';

const allReducers = combineReducers ({
    counter: counterReducer,
    isLogged: loggedReducer,
    isCrossed: crossedReducer
});

export default allReducers;