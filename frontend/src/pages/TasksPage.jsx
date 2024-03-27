import React, { useState } from 'react';
import TaskItem from '../components/TaskItem/TaskItem.jsx';
import TaskAddForm from '../components/TaskFormAdd/index.js';
import { useSelector } from 'react-redux';
import { selectTasks } from '../redux/tasks/selectors.js';
import TaskList from '../components/TaskList/index.js';
import { Heading } from '@chakra-ui/react';

export default function TasksPage() {
  const tasks = useSelector(selectTasks);

  return (<div>
    <Heading as={'h2'} size={'2xl'}>Task List</Heading>
    <Heading as={'h3'} size={'xl'}>Add Task</Heading>
    <TaskAddForm />
    <Heading as={'h3'} size={'xl'}>Task items</Heading>
    {tasks.length === 0 && <p>There is no tasks for now</p>}
    {tasks && <TaskList tasks={tasks} />}
  </div>);
}
