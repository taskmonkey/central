import { FETCH_POSTS } from '../Actions/index';

const INITIAL_STATE = {allTasks: [], task: null};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {...state, allTasks: action.payload.data };
    default:
      return state;
  }
}