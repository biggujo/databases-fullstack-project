import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import TaskItem from '../TaskItem/TaskItem.jsx';
import { useTranslation } from 'react-i18next';
import TaskFormUpdate from '../TaskFormUpdate/index.js';
import { Paginate } from 'react-paginate-chakra-ui';
import Paginator from '../Paginator/index.js';

const PAGE_SIZE = 5;

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
  const [page, setPage] = useState(0);

  const handleShow = id => setShowId(id);

  useEffect(() => {
    dispatch(operations.fetchAllTasks());
  }, []);

  if (!tasks || tasks.length === 0) {
    return <Text>{t('noTasksAvailable')}</Text>;
  }

  const tasksSlice = tasks.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (<Box>
    <List spacing={4} direction={'column'} style={{
      listStyle: 'none',
    }}>
      {tasksSlice && tasksSlice.map((props) => <ListItem key={props.id}
                                                         bg="purple.50">
        <TaskItem data={...props}
                  operations={operations}
                  updateForm={UpdateFormComponent}
                  onShow={handleShow}
                  shouldOpen={props.id === showId}
                  openable={openable}
                  isParent={isParent} />
      </ListItem>)}
    </List>
    {<Paginator count={tasks.length}
                page={page}
                handlePageClick={(p) => setPage(p)}
                pageSize={PAGE_SIZE} />}
  </Box>);
}
