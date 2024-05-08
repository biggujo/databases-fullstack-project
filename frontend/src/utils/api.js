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

const API = {
  auth: {
    login,
    register,
    logout,
  },
};

export default API;
