import axios from 'axios';

import {TEST_API_KEY} from '../../config';

const API_KEY = TEST_API_KEY;
const ROOT_URL = `http://reduxblog.herokuapp.com/api`;

export const FETCH_TASKS = 'FETCH_TASKS';
export const CREATE_TASK = 'CREATE_TASK'
export const GET_TASKS = 'GET_TASKS'
export const GET_ALL_TASKS = 'GET_ALL_TASKS'
export const GET_USERS_TASKS = 'GET_USERS_TASKS'
export const FIND_ALL_TASKS_OF_USERS = 'FIND_ALL_TASKS_OF_USERS'
export const GET_ALL_USERS = 'GET_ALL_USERS'


export const STORE_PROFILE = 'STORE_PROFILE';

export function fetchTasks() {
  const request = axios.get('/allProjectsByUser', {params: {userid: 2}});
  console.log(request);
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
  //console.log('this is the getAllUsersTasks', info)
  return {
    type: GET_USERS_TASKS,
    payload: info
  }
}

export function getAllTasks(info){
  //console.log('this is in the getalltasks action', info)
  return {
    type: GET_ALL_TASKS,
    payload: info
  }
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
}
export function storeProfile(profile) {
  return {
    type: STORE_PROFILE,
    payload: profile
  }
}
