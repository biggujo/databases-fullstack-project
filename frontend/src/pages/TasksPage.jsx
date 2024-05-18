import React from 'react';
import TaskList from '../components/TaskList/index.js';
import { Box, Flex, Heading } from '@chakra-ui/react';
import TaskFormAdd from '../components/TaskFormAdd/index.js';
import { TasksOperations } from '../redux/tasks/operations.js';
import { selectTasks } from '../redux/tasks/selectors.js';

export default function TasksPage() {
  return (<Flex direction={'column'} gap={2}>
    <Heading as={'h2'} size={'2xl'}>Task List</Heading>

    <Heading as={'h3'} size={'xl'}>Add Task</Heading>
    <Box width={'50%'}>
      <TaskFormAdd operations={TasksOperations} />
    </Box>
    
    <Heading as={'h3'} size={'xl'}>Task Items</Heading>
    <TaskList
      selector={selectTasks}
      operations={TasksOperations} />
  </Flex>);
}
