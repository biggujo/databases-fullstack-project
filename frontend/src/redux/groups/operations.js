import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api.js';
import toast from 'react-hot-toast';

const fetchAllGroups = createAsyncThunk('groups/fetchAll',
  async (parameters, { rejectWithValue }) => {
    try {
      const urlParameters = new URLSearchParams(parameters);

      return await API.groups.fetchAllGroups(urlParameters);
    } catch (e) {
      toast.error(e.response.data.message);
      return rejectWithValue(e);
    }
  },
);

const addGroup = createAsyncThunk('groups/addGroup',
  async (name, { rejectWithValue }) => {
    try {
      return await API.groups.addGroup(name);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const toggleGroupMembership = async (id, {
  dispatch,
  rejectWithValue,
}, apiFunction) => {
  try {
    await apiFunction(id);
    dispatch(fetchAllGroups());
  } catch (e) {
    return rejectWithValue(e);
  }
};

const joinGroupById = createAsyncThunk('groups/joinById',
  (id, thunkAPI) => toggleGroupMembership(id,
    thunkAPI,
    API.groups.joinGroupById,
  ),
);

const leaveGroupById = createAsyncThunk('groups/joinById',
  (id, thunkAPI) => toggleGroupMembership(id,
    thunkAPI,
    API.groups.leaveGroupById,
  ),
);

export const GroupsOperations = {
  fetchAllGroups,
  addGroup,
  joinGroupById,
  leaveGroupById,
};
