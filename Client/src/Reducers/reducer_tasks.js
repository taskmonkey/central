import { FETCH_PROJECTS, CREATE_TASK, GET_USERS_TASKS, GET_ALL_TASKS, FIND_ALL_TASKS_OF_USERS, GET_ALL_USERS, STORE_PROFILE, PROJECT_TREE, GET_TASKS_BY_LOGGED_IN_USER, CREATE_PROJECT } from '../Actions/index';

const INITIAL_STATE = { allTasks: [], usersTasks: [], allTasksByUsers: [], allUsers: [], profile: {}, task: null, allProjects: [], projectTree: {}, tasksByLoggedInUser: [] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_PROJECTS:
    return Object.assign({}, state, {allProjects: action.payload});
  case CREATE_PROJECT:
    return Object.assign({}, state, {allProjects: [...state.allProjects, action.payload]});
  case CREATE_TASK:
    return Object.assign({}, state, {allTasks: [...state.allTasks, action.payload], tasksByLoggedInUser: [...state.tasksByLoggedInUser]});
  case GET_USERS_TASKS:
    return Object.assign({},state, {usersTasks: action.payload});
  case GET_ALL_TASKS:
    return Object.assign({}, state, {allTasks: action.payload})
  case FIND_ALL_TASKS_OF_USERS: 
    return Object.assign({}, state, {allTasksByUsers: action.payload})
  case GET_ALL_USERS: 
    return Object.assign({}, state, {allUsers: action.payload})
  case STORE_PROFILE:
    return Object.assign({}, state, {profile: action.payload});
  case PROJECT_TREE:
    return Object.assign({}, state, {projectTree: action.payload});
  case GET_TASKS_BY_LOGGED_IN_USER:
    return Object.assign({}, state, {tasksByLoggedInUser: action.payload});
  default:
    return state;
  }
}