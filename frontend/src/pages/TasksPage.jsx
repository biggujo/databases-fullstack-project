import React from 'react';
import TaskList from '../components/TaskList/index.js';
import { Flex, Heading } from '@chakra-ui/react';
import TaskFormAdd from '../components/TaskFormAdd/index.js';

export default function TasksPage() {
  return (<Flex direction={'column'} gap={2}>
    <Heading as={'h2'} size={'2xl'}>Task List</Heading>
    <Heading as={'h3'} size={'xl'}>Add Task</Heading>
    <TaskFormAdd />
    <Heading as={'h3'} size={'xl'}>Task items</Heading>
    <TaskList />
  </Flex>);
}
