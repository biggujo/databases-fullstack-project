import React from 'react';
import {
  Box, Flex, Text, Heading,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectUserGroups } from '../redux/groups/selectors.js';
import GroupFilters from '../components/GroupFilters/index.js';
import GroupList from '../components/GroupList/index.js';
import { useTranslation } from 'react-i18next';

function MyGroups() {
  const groups = useSelector(selectUserGroups);
  const { t } = useTranslation();

  return (<Flex direction={'column'} gap={2}>
    <Box>
      <Heading as="h2" size="2xl" mb={4}>{t('myGroups')}</Heading>
      <Text mb={4}>{t('joinedGroups')} {groups.length}</Text>
    </Box>

    <Flex direction={'column'} gap={2} alignItems={'start'}>
      <Heading as={'h3'} size={'xl'}>{t('list')}</Heading>
      <Heading as={'h4'} size={'lg'}>{t('filter')}</Heading>

      <Box width={'50%'}>
        <GroupFilters />
      </Box>
      <Heading as={'h4'} size={'lg'}>{t('results')}</Heading>
    </Flex>
    <GroupList items={groups} />
  </Flex>);
}

export default MyGroups;
