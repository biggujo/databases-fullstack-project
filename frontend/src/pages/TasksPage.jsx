import React from 'react';
import TaskList from '../components/TaskList/index.js';
import { Flex, Heading } from '@chakra-ui/react';
import TaskFormAdd from '../components/TaskFormAdd/index.js';
import { useTranslation } from 'react-i18next';

export default function TasksPage() {
  const { t } = useTranslation();
  return (<Flex direction={'column'} gap={2}>
    <Heading as={'h2'} size={'2xl'}>{t('taskList')}</Heading>
    <Heading as={'h3'} size={'xl'}>{t('addTask')}</Heading>
    <TaskFormAdd />
    <Heading as={'h3'} size={'xl'}>{t('taskItems')}</Heading>
    <TaskList />
  </Flex>);
}
