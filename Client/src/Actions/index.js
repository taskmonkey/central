import axios from 'axios';

import {TEST_API_KEY} from '../../config';

const API_KEY = TEST_API_KEY;
const ROOT_URL = `http://reduxblog.herokuapp.com/api`;

export const FETCH_TASKS = 'FETCH_TASKS';
export const CREATE_TASK = 'CREATE_TASK'
export const GET_TASKS = 'GET_TASKS'
export const GET_ALL_TASKS = 'GET_ALL_TASKS'
export const GET_USERS_TASKS = 'GET_USERS_TASKS'


export function fetchTasks() {
  const request = axios.get(`${ROOT_URL}/posts?${API_KEY}`);
  return {
    type: FETCH_TASKS,
    payload: request
  };
}

export function createTask(task) {
  return {
    type: CREATE_TASK,
    payload: task
  }
}

export function getUsersTasks(info){
  
  return {
    type: GET_USERS_TASKS,
    payload: info
  }
}

export function getAllTasks(info){
  console.log('this is in the getalltasks action', info)
  return {
    type: GET_ALL_TASKS,
    payload: info
  }
}