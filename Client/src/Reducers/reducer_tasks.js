import { FETCH_TASKS } from '../Actions/index';

const INITIAL_STATE = { allTasks: [], task: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_TASKS:
    //return state.allTasks.concat([action.payload.data]);
    // return {...state, allTasks: action.payload.data};
    return Object.assign({}, state, {allTasks: action.payload.data});
  default:
    return state;
  }
}
