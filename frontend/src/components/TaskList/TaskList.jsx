import React, { useEffect } from 'react';
import { List, ListItem, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import TaskItem from '../TaskItem/TaskItem.jsx';

export default function TaskList({
  operations,
  selector,
}) {
  const dispatch = useDispatch();
  const tasks = useSelector(selector);

  useEffect(() => {
    dispatch(operations.fetchAllTasks());
  }, []);

  if (!tasks || tasks.length === 0) {
    return <Text fontSize={'2xl'}>No tasks available</Text>;
  }

  return (<List spacing={4} direction={'column'} style={{
    listStyle: 'none',
  }}>
    {tasks && tasks.map((props) => <ListItem key={props.id} bg="purple.50">
      <TaskItem data={...props} operations={operations} />
    </ListItem>)}
  </List>);
}
