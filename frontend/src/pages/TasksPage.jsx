import React, { useState } from 'react';
import TaskItem from '../components/TaskItem/TaskItem.jsx';
import TaskAddForm from '../components/TaskFormAdd/index.js';
import { useSelector } from 'react-redux';
import { selectTasks } from '../redux/tasks/selectors.js';
import TaskList from '../components/TaskList/index.js';
import { Flex, Heading } from '@chakra-ui/react';

export default function TasksPage() {
  return (<Flex direction={'column'} gap={2}>
    <Heading as={'h2'} size={'2xl'}>Task List</Heading>
    <Heading as={'h3'} size={'xl'}>Add Task</Heading>
    <TaskAddForm />
    <Heading as={'h3'} size={'xl'}>Task items</Heading>
    <TaskList />
  </Flex>);
}
