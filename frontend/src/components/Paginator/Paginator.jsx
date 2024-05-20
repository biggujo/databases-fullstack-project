import React from 'react';
import { Paginate } from 'react-paginate-chakra-ui';
import { Box, Center, Flex } from '@chakra-ui/react';

export default function Paginator({
  count,
  page,
  pageSize,
  handlePageClick,
}) {
  return (<Center>
    <Paginate
      // required props 👇
      page={page}
      count={count}
      pageSize={pageSize}
      onPageChange={handlePageClick}
      // optional props 👇
      margin={2}
      border={'1px solid'}
      colorScheme={'purple'}
    />
  </Center>);
}
