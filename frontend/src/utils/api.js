// Here will be API requests

import axios from 'axios';
import groups from '../pages/Groups.jsx';

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
  // Not good way to do two requests, but the backend doesn't have a method to toggle completion
  const actualTask = await axios.get(`/tasks/${id}`);

  const response = await axios.put(`/tasks/${id}`, {
    isDone: !actualTask.data.isDone,
  });

  return response.data;
};

// data = { name, description, isDone, deadline }
const addTask = async (data) => {
  const response = await axios.post('/tasks/', data);

  return response.data;
};

const updateById = async (id, data) => {
  const response = await axios.put(`/tasks/${id}`, data);

  return response.data;
};

const deleteById = async (id) => {
  const response = await axios.delete(`/tasks/${id}`);

  return response.data;
};

const fetchAllGroups = async () => {
  const response = await axios.get('/groups');

  return response.data;
};

const fetchById = async (id) => {
  const response = await axios.get(`/groups/${id}`);

  return response.data;
};

const addGroup = async (name) => {
  const response = await axios.post('/groups/', {
    name,
  });

  return response.data;
};

const joinGroupById = async (groupId) => await axios.post(`/groups/${groupId}/users`);

const leaveGroupById = async (groupId) => await axios.delete(`/groups/${groupId}/users`);

const fetchGroupTasksById = async (groupId) => {
  const response = await axios.get(`/groups/${groupId}/tasks`);

  return response.data.json_list;
};

const toggleGroupTaskCompletedById = async ({
  groupId,
  taskId,
}) => {
  // Not good way to do two tasks, but the backend doesn't have a method to toggle completion
  const actualTask = await axios.get(`/groups/${groupId}/tasks/${taskId}`);

  const response = await axios.put(`/groups/${groupId}/tasks/${taskId}`, {
    isDone: !actualTask.data.isDone,
  });

  return response.data;
};

// data = { name, description, isDone, deadline }
const addGroupTask = async ({
  groupId,
  data,
}) => {
  console.log(groupId);
  console.log(data);
  const response = await axios.post(`/groups/${groupId}/tasks`, data);

  return response.data;
};

const updateGroupTaskById = async ({
  groupId,
  taskId,
  data,
}) => {
  const response = await axios.put(`/groups/${groupId}/tasks/${taskId}`, data);

  return response.data;
};

const deleteGroupTaskById = async ({
  groupId,
  taskId,
}) => {
  const response = await axios.delete(`/groups/${groupId}/tasks/${taskId}`);

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
    addTask,
    updateById,
    deleteById,
  },
  groups: {
    fetchAllGroups,
    fetchById,
    addGroup,
    joinGroupById,
    leaveGroupById,
    tasks: {
      fetchGroupTasksById,
      toggleGroupTaskCompletedById,
      addGroupTask,
      updateGroupTaskById,
      deleteGroupTaskById,
    },
  },
};

export default API;
