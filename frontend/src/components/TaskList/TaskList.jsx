import React, { useEffect, useState } from 'react';
import { List, ListItem, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import TaskItem from '../TaskItem/TaskItem.jsx';
import { useTranslation } from 'react-i18next';
import TaskFormUpdate from '../TaskFormUpdate/index.js';

export default function TaskList({
  operations,
  selector,
  updateFormComponent: UpdateFormComponent = TaskFormUpdate,
  isParent = false,
  openable = true,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tasks = useSelector(selector);
  const [showId, setShowId] = useState();

  const handleShow = id => setShowId(id);

  useEffect(() => {
    dispatch(operations.fetchAllTasks());
  }, []);

  if (!tasks || tasks.length === 0) {
    return <Text>{t('noTasksAvailable')}</Text>;
  }

  return (<List spacing={4} direction={'column'} style={{
    listStyle: 'none',
  }}>
    {tasks && tasks.map((props) => <ListItem key={props.id} bg="purple.50">
      <TaskItem data={...props}
                operations={operations}
                updateForm={UpdateFormComponent}
                onShow={handleShow}
                shouldOpen={props.id === showId}
                openable={openable}
                isParent={isParent} />
    </ListItem>)}
  </List>);
}
