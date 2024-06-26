import React from 'react';
import TaskList from '../components/TaskList/index.js';
import { Box, Flex, Heading } from '@chakra-ui/react';
import TaskFormAdd from '../components/TaskFormAdd/index.js';
import { TasksOperations } from '../redux/tasks/operations.js';
import { selectTasks } from '../redux/tasks/selectors.js';
import { useTranslation } from 'react-i18next';
import TaskFilterForm from '../components/TaskFilterForm/TaskFilterForm.jsx';
import TaskFilterFormOwn
  from '../components/TaskFilterFormOwn/TaskFilterFormOwn.jsx';

export default function TasksPage() {
  const { t } = useTranslation();

  return (<Flex direction={'column'} gap={2}>
    <Heading as={'h2'} size={'2xl'}>{t('taskList')}</Heading>

    <Heading as={'h3'} size={'xl'}>{t('addTask')}</Heading>
    <Box width={'50%'}>
      <TaskFormAdd operations={TasksOperations} />
    </Box>

    <Heading as={'h3'} size={'xl'}>{t('taskItems')}</Heading>
    <Heading as={'h4'} size={'lg'}>{t('filter')}</Heading>
    <TaskFilterFormOwn />
    <Heading as={'h4'} size={'lg'}>{t('results')}</Heading>
    <TaskList
      selector={selectTasks}
      operations={TasksOperations}
      isParent={true} />
  </Flex>);
}
