import { FETCH_TASKS, CREATE_TASK, GET_USERS_TASKS, GET_ALL_TASKS } from '../Actions/index';

const INITIAL_STATE = { allTasks: [], usersTasks: [], task: null };

export default function(state = INITIAL_STATE, action) {
  //console.log('this is the reducer', action)
  switch (action.type) {
  case FETCH_TASKS:
    //return state.allTasks.concat([action.payload.data]);
    // return {...state, allTasks: action.payload.data};
    return Object.assign({}, state, {allTasks: action.payload.data});
  case CREATE_TASK:
    return Object.assign({}, state, {allTasks: [...state.allTasks, action.payload]});
  case GET_USERS_TASKS:
    return Object.assign({},state, {usersTasks: action.payload});
  case GET_ALL_TASKS:
    return Object.assign({}, state, {allTasks: action.payload})
  default:
    return state;
  }
}
