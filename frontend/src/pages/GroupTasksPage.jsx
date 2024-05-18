import React from 'react';
import { Text, Flex, Heading, Box } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import useGroupFetchById from '../../hooks/useGroupFetchById.js';
import TaskList from '../components/TaskList/index.js';
import { selectGroupTasks } from '../redux/groupTasks/selectors.js';
import { GroupTasksOperations } from '../redux/groupTasks/operations.js';
import TaskFormAdd from '../components/TaskFormAdd/index.js';

export default function GroupTasksPage() {
  const { id } = useParams();
  const {
    data,
    error,
    isLoading,
  } = useGroupFetchById(id);

  if (error) {
    return (<Navigate to={'/'} />);
  }

  if (isLoading) {
    return <Text fontSize={'xl'}>Loading...</Text>;
  }

  return (<Flex direction={'column'} gap={2}>
    <Heading as={'h2'} size={'2xl'}>Group: {data.name}</Heading>

    <Heading as={'h3'} size={'xl'}>Add Task</Heading>
    <Box width={'50%'}>
      <TaskFormAdd operations={GroupTasksOperations(id)} />
    </Box>

    <Heading as={'h3'} size={'xl'}>Task Items</Heading>
    <TaskList
      selector={selectGroupTasks}
      operations={GroupTasksOperations(id)} />
  </Flex>);
}
