import React from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors.js';

export default function GroupItem({
  name,
  users,
}) {
  const currentUser = useSelector(selectAuthUser);
  const isMember = users.find(({ id }) => id === currentUser.id);

  return (<Flex justifyContent="space-between" alignItems="center">
    <Text fontSize="xl">{name}</Text>
    <Flex alignItems="center">
      <Text mr={4}>Members: {users.length}</Text>
      <Button
        width={100}
        colorScheme={isMember ? 'red' : 'green'}>
        {isMember ? 'Leave' : 'Join'}
      </Button>
    </Flex>
  </Flex>);
}
