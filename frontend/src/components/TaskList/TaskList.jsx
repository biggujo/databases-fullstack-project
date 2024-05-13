import React, { useEffect } from 'react';
import TaskItem from '../TaskItem/TaskItem.jsx';
import { Flex, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTasks } from '../../redux/tasks/selectors.js';
import { TasksOperations } from '../../redux/tasks/operations.js';

export default function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  useEffect(() => {
    dispatch(TasksOperations.fetchAllTasks());
  }, []);

  if (!tasks || tasks.length === 0) {
    return <Text fontSize={'2xl'}>No tasks available</Text>;
  }

  return (<Flex as={'ul'} direction={'column'} style={{
    listStyle: 'none',
  }}>
    {tasks && tasks.map((props) => <li key={props.id}>
      <TaskItem {...props} />
    </li>)}
  </Flex>);
}
