import React from 'react';
import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGroupsNameFilter } from '../../redux/filters/selectors.js';
import {
  clearGroupsNameFilter, setGroupsNameFilter,
} from '../../redux/filters/slice.js';
import { useTranslation } from 'react-i18next';

export default function GroupFilters() {
  const dispatch = useDispatch();
  const nameFilter = useSelector(selectGroupsNameFilter);
  const { t } = useTranslation();

  const handleFilterChange = (event) => {
    const { value } = event.target;
    dispatch(setGroupsNameFilter(value));
  };

  const handleFilterClear = () => dispatch(clearGroupsNameFilter());

  return (<Flex gap={4}>
    <Input
      placeholder={t('searchGroups')}
      value={nameFilter}
      onChange={handleFilterChange}
    />
    <Button onClick={handleFilterClear}>{t('clear')}</Button>
  </Flex>);
}
