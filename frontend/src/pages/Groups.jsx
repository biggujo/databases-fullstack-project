import {
  Box, Input, Text, Heading, Flex,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setGroupsNameFilter } from '../redux/filters/slice.js';
import GroupFormAdd from '../components/GroupFormAdd/index.js';
import GroupList from '../components/GroupList/index.js';
import { selectGroupsNameFilter } from '../redux/filters/selectors.js';
import { selectGroups } from '../redux/groups/selectors.js';
import React from 'react';
import GroupFilters from '../components/GroupFilters/index.js';
import { useTranslation } from 'react-i18next';
import GroupFilterForm from '../components/GroupFilterForm/index.js';

function Groups() {
  const groups = useSelector(selectGroups);
  const { t } = useTranslation();

  return (<Flex direction={'column'} gap={2}>
    <Box>
      <Heading as="h2" size="2xl" mb={4}>{t('groups')}</Heading>
      <Text mb={4}>{t('availableAmount')} {groups.length}</Text>
    </Box>

    <Flex direction={'column'} gap={2} alignItems={'start'}>
      <Heading as={'h3'} size={'xl'}>{t('createGroup')}</Heading>
      <Box width={'50%'}>
        <GroupFormAdd />
      </Box>

      <Heading as={'h3'} size={'xl'}>{t('groupItems')}</Heading>
      <Heading as={'h4'} size={'lg'}>{t('filter')}</Heading>

      <GroupFilterForm />
      <Heading as={'h4'} size={'lg'}>{t('results')}</Heading>
    </Flex>
    <GroupList items={groups} />
  </Flex>);
}

export default Groups;
