// Here will be API requests

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:6001/api';
axios.defaults.withCredentials = true;

const auth = {
  login: async ({
    username,
    password,
  }) => {
    const response = await axios.post('/users/login', {
      username,
      password,
    });

    return response.data;
  },
  register: async ({
    username,
    password,
  }) => {
    const response = await axios.post('/users/create', {
      username,
      password,
    });

    return response.data;
  },
  logout: async () => await axios.delete('/users/logout'),
};

const tasks = {
  fetchAllTasks: async (urlParameters) => {
    if (typeof urlParameters === 'undefined') {
      urlParameters = 'sort_deadline=asc&status=in_progress';
    } else if (urlParameters.get('sort_deadline') === null) {
      urlParameters.append('sort_deadline', 'asc');
      urlParameters.append('status', 'in_progress');
    }

    const response = await axios.get(`/tasks?${urlParameters}`);

    const data = response.data.json_list;

    return data;
  },
  toggleCompletedById: async (id) => {
    // Not good way to do two requests, but the backend doesn't have a method to toggle completion
    const actualTask = await axios.get(`/tasks/${id}`);

    const response = await axios.put(`/tasks/${id}`, {
      isDone: !actualTask.data.isDone,
    });

    return response.data;
  },
  addTask: async (data) => {
    // data = { name, description, isDone, deadline }
    const response = await axios.post('/tasks/', data);

    return response.data;
  },
  updateById: async (id, data) => {
    const response = await axios.put(`/tasks/${id}`, data);

    return response.data;
  },
  deleteById: async (id) => {
    const response = await axios.delete(`/tasks/${id}`);

    return response.data;
  },
};

const subtasks = {
  fetchAllTasks: async (parentId) => {
    const response = await axios.get(`/tasks/${parentId}/subtasks`);

    return response.data.json_list;
  },
  toggleCompletedById: async ({
    parentId,
    subtaskId,
  }) => {
    // Not good way to do two requests, but the backend doesn't have a method to toggle completion
    const actualTask = await axios.get(`/tasks/${parentId}/subtasks/${subtaskId}`);

    const response = await axios.put(`/tasks/${parentId}/subtasks/${subtaskId}`,
      {
        isDone: !actualTask.data.isDone,
      },
    );

    return response.data;
  },
  addTask: async ({
    parentId,
    data,
  }) => {
    // data = { name, description, isDone, deadline }
    const response = await axios.post(`/tasks/${parentId}/subtasks`, data);

    return response.data;
  },
  updateById: async ({
    parentId,
    subtaskId,
    data,
  }) => {
    const response = await axios.put(`/tasks/${parentId}/subtasks/${subtaskId}`,
      data,
    );

    return response.data;
  },
  deleteById: async ({
    parentId,
    subtaskId,
  }) => {
    const response = await axios.delete(`/tasks/${parentId}/subtasks/${subtaskId}`);

    return response.data;
  },
};

const groups = {
  fetchAllGroups: async () => {
    const response = await axios.get('/groups');

    return response.data;
  },
  fetchById: async (id) => {
    const response = await axios.get(`/groups/${id}`);

    return response.data;
  },
  addGroup: async (name) => {
    const response = await axios.post('/groups/', {
      name,
    });

    return response.data;
  },
  joinGroupById: async (groupId) => await axios.post(`/groups/${groupId}/users`),
  leaveGroupById: async (groupId) => await axios.delete(`/groups/${groupId}/users`),
};

const groupTasks = {
  fetchGroupTasksById: async (groupId) => {
    const response = await axios.get(`/groups/${groupId}/tasks`);

    return response.data.json_list;
  },
  toggleGroupTaskCompletedById: async ({
    groupId,
    taskId,
  }) => {
    // Not good way to do two tasks, but the backend doesn't have a method to toggle completion
    const actualTask = await axios.get(`/groups/${groupId}/tasks/${taskId}`);

    const response = await axios.put(`/groups/${groupId}/tasks/${taskId}`, {
      isDone: !actualTask.data.isDone,
    });

    return response.data;
  },
  addGroupTask: async ({
    groupId,
    data,
  }) => {
    // data = { name, description, isDone, deadline }
    const response = await axios.post(`/groups/${groupId}/tasks`, data);

    return response.data;
  },
  updateGroupTaskById: async ({
    groupId,
    taskId,
    data,
  }) => {
    const response = await axios.put(`/groups/${groupId}/tasks/${taskId}`,
      data,
    );

    return response.data;
  },
  deleteGroupTaskById: async ({
    groupId,
    taskId,
  }) => {
    const response = await axios.delete(`/groups/${groupId}/tasks/${taskId}`);

    return response.data;
  },
};

const API = {
  auth,
  tasks: {
    ...tasks,
    subtasks,
  },
  groups: {
    ...groups,
    tasks: groupTasks,
  },
};

export default API;
