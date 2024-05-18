import React, { useEffect, useMemo, useRef } from 'react';
import { List, ListItem, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGroups } from '../../redux/groups/selectors.js';
import { GroupsOperations } from '../../redux/groups/operations.js';
import GroupItem from '../GroupItem/index.js';
import { selectGroupsNameFilter } from '../../redux/filters/selectors.js';
import Fuse from 'fuse.js';

export default function GroupList() {
  const dispatch = useDispatch();
  const groups = useSelector(selectGroups);
  const nameFilter = useSelector(selectGroupsNameFilter);
  const fuse = useRef(new Fuse(groups, {
    keys: [
      'name',
    ],
  }));

  useEffect(() => {
    dispatch(GroupsOperations.fetchAllGroups());
  }, []);

  useEffect(() => {
    fuse.current = new Fuse(groups, {
      keys: [
        'name',
      ],
    });
  }, [groups]);

  const filteredGroups = useMemo(() => {
    if (nameFilter.trim() === '') {
      return groups;
    }

    return fuse.current.search(nameFilter).map(({ item }) => item);
  }, [
    groups,
    nameFilter,
  ]);

  if (filteredGroups.length === 0) {
    return <Text fontSize={'2xl'}>No groups available</Text>;
  }

  return (<List spacing={4}>
    {filteredGroups.map(({
      id,
      name,
      users,
    }) => (<ListItem key={id} bg="purple.50" borderRadius="md">
      <GroupItem id={id} name={name} users={users} />
    </ListItem>))}
  </List>);
}
