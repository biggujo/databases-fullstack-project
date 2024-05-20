import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, List, ListItem, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { GroupsOperations } from '../../redux/groups/operations.js';
import GroupItem from '../GroupItem/index.js';
import { selectGroupsNameFilter } from '../../redux/filters/selectors.js';
import Fuse from 'fuse.js';
import { useTranslation } from 'react-i18next';
import Paginator from '../Paginator/index.js';

const PAGE_SIZE = 5;

export default function GroupList({ items: groups }) {
  const dispatch = useDispatch();
  const nameFilter = useSelector(selectGroupsNameFilter);
  const fuse = useRef(new Fuse(groups, {
    keys: [
      'name',
    ],
  }));
  const [page, setPage] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(GroupsOperations.fetchAllGroups());
  }, []);

  useEffect(() => {
    fuse.current = new Fuse(groups, {
      keys: [
        'name',
      ],
    });
  }, [groups]);

  const filteredGroups = useMemo(() => {
    if (nameFilter.trim() === '') {
      return groups;
    }

    return fuse.current.search(nameFilter).map(({ item }) => item);
  }, [
    groups,
    nameFilter,
  ]);

  const groupsSlice = filteredGroups.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE,
  );

  if (filteredGroups.length === 0) {
    return <Text fontSize={'2xl'}>{t('noGroupsAvailable')}</Text>;
  }

  return (<Box>
    <List spacing={4}>
      {groupsSlice.map(({
        id,
        name,
        users,
      }) => (<ListItem key={id} bg="purple.50" borderRadius="md">
        <GroupItem id={id} name={name} users={users} />
      </ListItem>))}
    </List>
    {<Paginator count={groups.length}
                page={page}
                handlePageClick={(p) => setPage(p)}
                pageSize={PAGE_SIZE} />}
  </Box>);
}
