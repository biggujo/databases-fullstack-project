import {
  Box, Input, Text, Heading, Flex,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setGroupsNameFilter } from '../redux/filters/slice.js';
import GroupFormAdd from '../components/GroupFormAdd/index.js';
import GroupList from '../components/GroupList/index.js';
import { selectGroupsNameFilter } from '../redux/filters/selectors.js';
import { selectGroups } from '../redux/groups/selectors.js';
import React from 'react';
import GroupFilters from '../components/GroupFilters/index.js';

function Groups() {
  const groups = useSelector(selectGroups);

  return (<Flex direction={'column'} gap={2}>
    <Box>
      <Heading as="h2" size="2xl" mb={4}>All Groups</Heading>
      <Text mb={4}>Available amount: {groups.length}</Text>
    </Box>

    <Heading as={'h3'} size={'xl'}>Add Group</Heading>
    <GroupFormAdd />

    <Heading as={'h3'} size={'xl'}>Group Items</Heading>
    <Heading as={'h4'} size={'lg'}>Filter</Heading>

    <GroupFilters />
    <Heading as={'h4'} size={'lg'}>Results</Heading>
    <GroupList />
  </Flex>);
}

export default Groups;
