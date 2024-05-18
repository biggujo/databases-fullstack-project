import React from 'react';
import { Box, Input } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGroupsNameFilter } from '../../redux/filters/selectors.js';
import { setGroupsNameFilter } from '../../redux/filters/slice.js';

export default function GroupFilters() {
  const dispatch = useDispatch();
  const nameFilter = useSelector(selectGroupsNameFilter);

  const handleFilterChange = (event) => {
    const { value } = event.target;
    dispatch(setGroupsNameFilter(value));
  };

  return (<Box>
    <Input
      placeholder="Search for groups..."
      value={nameFilter}
      onChange={handleFilterChange}
    />
  </Box>);
}
