import { combineReducers } from 'redux';
import TasksReducer from './reducer_tasks';

const combinedReducers = combineReducers({
  tasks: TasksReducer
})

export default combinedReducers;