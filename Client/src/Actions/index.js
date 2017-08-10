import axios from 'axios';

import {TEST_API_KEY} from '../../config';

const API_KEY = TEST_API_KEY;
const ROOT_URL = `http://reduxblog.herokuapp.com/api`;

export const FETCH_TASKS = 'FETCH_TASKS';
export const CREATE_TASK = 'CREATE_TASK'
export const GET_TASKS = 'GET_TASKS'
export const GET_ALL_TASKS = 'GET_ALL_TASKS'
export const GET_USERS_TASKS = 'GET_USERS_TASKS'
<<<<<<< HEAD
export const FIND_ALL_TASKS_OF_USERS = 'FIND_ALL_TASKS_OF_USERS'
export const GET_ALL_USERS = 'GET_ALL_USERS'
=======
>>>>>>> 8b236fd62b349204ccd5ee92db4caad2b01ceb36


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
<<<<<<< HEAD
  //console.log('this is the getAllUsersTasks', info)
=======
  
>>>>>>> 8b236fd62b349204ccd5ee92db4caad2b01ceb36
  return {
    type: GET_USERS_TASKS,
    payload: info
  }
}

export function getAllTasks(info){
<<<<<<< HEAD
  //console.log('this is in the getalltasks action', info)
=======
  console.log('this is in the getalltasks action', info)
>>>>>>> 8b236fd62b349204ccd5ee92db4caad2b01ceb36
  return {
    type: GET_ALL_TASKS,
    payload: info
  }
<<<<<<< HEAD
}

export function findAllTasksOfUser(info){
  //console.log('this is the findAllTasksOfUser', info)
  return {
    type: FIND_ALL_TASKS_OF_USERS,
    payload: info 
  }
}

export function getAllUsers(info){
  //console.log('this is working')
  return {
    type: GET_ALL_USERS,
    payload: info
  }
=======
>>>>>>> 8b236fd62b349204ccd5ee92db4caad2b01ceb36
}