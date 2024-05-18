import React from 'react';
import {
  Box, Flex, Text, Heading,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectUserGroups } from '../redux/groups/selectors.js';
import GroupFilters from '../components/GroupFilters/index.js';
import GroupList from '../components/GroupList/index.js';

function MyGroups() {
  const groups = useSelector(selectUserGroups);

  return (<Flex direction={'column'} gap={2}>
    <Box>
      <Heading as="h2" size="2xl" mb={4}>My Groups</Heading>
      <Text mb={4}>Available amount: {groups.length}</Text>
    </Box>

    <Flex direction={'column'} gap={2} alignItems={'start'}>
      <Heading as={'h3'} size={'xl'}>Group Items</Heading>
      <Heading as={'h4'} size={'lg'}>Filter</Heading>

      <Box width={'50%'}>
        <GroupFilters />
      </Box>
      <Heading as={'h4'} size={'lg'}>Results</Heading>
    </Flex>
    <GroupList items={groups} />
  </Flex>);
}

export default MyGroups;
