import React from 'react';
import {
  Text, Flex, Heading, Box, UnorderedList, ListItem,
} from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import useGroupFetchById from '../../hooks/useGroupFetchById.js';
import TaskList from '../components/TaskList/index.js';
import { selectGroupTasks } from '../redux/groupTasks/selectors.js';
import { GroupTasksOperations } from '../redux/groupTasks/operations.js';
import TaskFormAdd from '../components/TaskFormAdd/index.js';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../redux/auth/selectors.js';
import { useTranslation } from 'react-i18next';
import TaskFilterFormGroup from '../components/TaskFilterFormGroup/index.js';

export default function GroupTasksPage() {
  const { id: currentUserId } = useSelector(selectAuthUser);
  const { id } = useParams();
  const {
    data,
    error,
    isLoading,
  } = useGroupFetchById(id);
  const { t } = useTranslation();

  if (error) {
    return (<Navigate to={'/'} />);
  }

  if (isLoading) {
    return <Text fontSize={'xl'}>Loading...</Text>;
  }

  return (<Flex direction={'column'} gap={2} position={'relative'}>
    <Heading as={'h2'} size={'2xl'}>{t('group')}: {data.name}</Heading>

    <Heading as={'h3'} size={'xl'}>{t('addTask')}</Heading>
    <Box width={'50%'}>
      <TaskFormAdd operations={GroupTasksOperations(id)} />
    </Box>

    <Heading as={'h3'} size={'xl'}>{t('taskItems')}</Heading>
    <Heading as={'h4'} size={'lg'}>{t('filter')}</Heading>
    <TaskFilterFormGroup groupId={id} />
    <Heading as={'h4'} size={'lg'}>{t('results')}</Heading>
    <TaskList
      selector={selectGroupTasks}
      operations={GroupTasksOperations(id)}
      isParent={true}
    />
    <Box position={'absolute'} top={0} right={0} width={200}>
      <Text fontSize="xl">{t('listOfMembers')}:</Text>
      <UnorderedList marginLeft={8} spacing={2}>
        {data.users.map(({
          id: userId,
          username,
        }) => <ListItem key={userId}>
          {username} {userId === currentUserId && `(${t('you')})`}
        </ListItem>)}
      </UnorderedList>
    </Box>
  </Flex>);
}
