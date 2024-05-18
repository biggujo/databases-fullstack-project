import React from 'react';
import { Text, Flex, Heading } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import useGroupFetchById from '../../hooks/useGroupFetchById.js';
import TaskList from '../components/TaskList/index.js';
import { selectGroupTasks } from '../redux/groupTasks/selectors.js';
import { GroupTasksOperations } from '../redux/groupTasks/operations.js';

export default function GroupTasksPage() {
  const { id } = useParams();
  const {
    data,
    error,
    isLoading,
  } = useGroupFetchById(id);

  if (error) {
    return <Text fontSize={'xl'}>An error have just happened. Please, try to
      reload the page...</Text>;
  }

  if (isLoading) {
    return <Text fontSize={'xl'}>Loading...</Text>;
  }

  return (<Flex direction={'column'} gap={2}>
    <Heading as={'h2'} size={'2xl'}>Group: {data.name}</Heading>
    <Heading as={'h3'} size={'xl'}>Task Items</Heading>
    <TaskList
      selector={selectGroupTasks}
      operations={GroupTasksOperations(id)} />
  </Flex>);
}
