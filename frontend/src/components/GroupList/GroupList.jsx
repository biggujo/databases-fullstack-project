import React, { useEffect, useMemo } from 'react';
import { List, ListItem, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGroups } from '../../redux/groups/selectors.js';
import { GroupsOperations } from '../../redux/groups/operations.js';
import GroupItem from '../GroupItem/index.js';
import { selectGroupsNameFilter } from '../../redux/filters/selectors.js';

export default function GroupList() {
  const dispatch = useDispatch();
  const groups = useSelector(selectGroups);
  const nameFilter = useSelector(selectGroupsNameFilter);

  useEffect(() => {
    dispatch(GroupsOperations.fetchAllGroups());
  }, []);

  const filteredGroups = useMemo(() => {
      if (nameFilter === '') {
        console.log('Empty filter');
        return groups;
      }

      return groups.filter(({ name }) => name.toLowerCase().includes(nameFilter.toLowerCase()));
    },
    [
      groups,
      nameFilter,
    ],
  );

  console.log('> nameFilter ~', nameFilter);
  console.log('> filteredGroups ~', filteredGroups);

  if (filteredGroups.length === 0) {
    return <Text fontSize={'2xl'}>No groups available</Text>;
  }

  return (<List spacing={3}>
    {filteredGroups.map(({
      name,
      users,
    }) => (<ListItem key={name} p={3} bg="purple.100" borderRadius="md">
      <GroupItem name={name} users={users} />
    </ListItem>))}
  </List>);
}
