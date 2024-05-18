import { createSelector } from '@reduxjs/toolkit';
import { selectAuthUser } from '../auth/selectors.js';

export const selectGroups = (state) => state.groups;

export const selectUserGroups = createSelector([
    selectGroups,
    selectAuthUser,
  ],
  (groups,
    { id: userId }) => groups.filter(({ users }) => users.filter(({ id }) => id === userId).length > 0),
);
