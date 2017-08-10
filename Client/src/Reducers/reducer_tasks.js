<<<<<<< HEAD
import { FETCH_TASKS, CREATE_TASK, GET_USERS_TASKS, GET_ALL_TASKS, FIND_ALL_TASKS_OF_USERS, GET_ALL_USERS } from '../Actions/index';

const INITIAL_STATE = { allTasks: [], usersTasks: [], allTasksByUsers: [], allUsers: [], task: null };
=======
import { FETCH_TASKS, CREATE_TASK, GET_USERS_TASKS, GET_ALL_TASKS } from '../Actions/index';

const INITIAL_STATE = { allTasks: [], usersTasks: [], task: null };
>>>>>>> 8b236fd62b349204ccd5ee92db4caad2b01ceb36

export default function(state = INITIAL_STATE, action) {
  //console.log('this is the reducer', action)
  switch (action.type) {
  case FETCH_TASKS:
    //return state.allTasks.concat([action.payload.data]);
    // return {...state, allTasks: action.payload.data};
    return Object.assign({}, state, {allTasks: action.payload.data});
  case CREATE_TASK:
    return Object.assign({}, state, {allTasks: [...state.allTasks, action.payload]});
<<<<<<< HEAD

    //return Object.assign({}, state, {allTasks: action.payload.data});
  case GET_TASKS:
    return Object.assign({},state, {allTasks: action.payload});
=======
>>>>>>> 8b236fd62b349204ccd5ee92db4caad2b01ceb36
  case GET_USERS_TASKS:
    return Object.assign({},state, {usersTasks: action.payload});
  case GET_ALL_TASKS:
    return Object.assign({}, state, {allTasks: action.payload})
<<<<<<< HEAD
  case FIND_ALL_TASKS_OF_USERS: 
    return Object.assign({}, state, {}, {allTasksByUsers: action.payload})
  case GET_ALL_USERS: 
    return Object.assign({}, state, {allUsers: action.payload})
=======
>>>>>>> 8b236fd62b349204ccd5ee92db4caad2b01ceb36
  default:
    return state;
  }
}
