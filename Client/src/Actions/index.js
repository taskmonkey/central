import axios from 'axios';

import {TEST_API_KEY} from '../../config';

const API_KEY = TEST_API_KEY;
const ROOT_URL = `http://reduxblog.herokuapp.com/api`;

export const FETCH_TASKS = 'FETCH_TASKS';

export function fetchTasks() {
  const request = axios.get(`${ROOT_URL}/posts?${API_KEY}`);

  return {
    type: FETCH_TASKS,
    payload: request
  };
}
