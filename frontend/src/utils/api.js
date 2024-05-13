// Here will be API requests

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:6001/api';
axios.defaults.withCredentials = true;

const login = async ({
  username,
  password,
}) => {
  const response = await axios.post('/users/login', {
    username,
    password,
  });

  return response.data;
};

const register = async ({
  username,
  password,
}) => {
  const response = await axios.post('/users/create', {
    username,
    password,
  });

  return response.data;
};

const logout = async () => await axios.delete('/users/logout');

const fetchAllTasks = async () => {
  const response = await axios.get('/tasks');

  const data = response.data.json_list;

  return data;
};

const toggleCompletedById = async (id) => {
  // Not good way to do two tasks, but the backend doesn't have a method to toggle completion
  const actualTask = await axios.get(`/tasks/${id}`);

  const response = await axios.put(`/tasks/${id}`, {
    isDone: !actualTask.data.isDone,
  });

  return response.data;
};

const API = {
  auth: {
    login,
    register,
    logout,
  },
  tasks: {
    fetchAllTasks,
    toggleCompletedById,
  },
};

export default API;
