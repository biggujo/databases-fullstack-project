import React from 'react';
import {
  Box, Button, Flex, List, ListItem, Text, UnorderedList,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors.js';
import { GroupsOperations } from '../../redux/groups/operations.js';
import toast from 'react-hot-toast';
import useToggle from '../../../hooks/useToggle.js';
import { useNavigate } from 'react-router-dom';

export default function GroupItem({
  id,
  name,
  users,
}) {
  const {
    toggle,
    isOpen,
  } = useToggle();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectAuthUser);
  const isMember = users.find(({ id: userId }) => userId === currentUser.id);

  const handleJoinGroupClick = () => {
    let actionToDispatch;
    let successMessage;
    if (isMember) {
      // Prompt if to delete the group
      if (users.length === 1 && !confirm(
        'You are the last member. This will delete the group. Proceed?')) {
        return;
      }

      actionToDispatch = GroupsOperations.leaveGroupById(id);

      if (users.length === 1) {
        successMessage = 'You have deleted the group';
      } else {
        successMessage = 'You have leaved the group';
      }
    } else {
      actionToDispatch = GroupsOperations.joinGroupById(id);
      successMessage = 'You have joined the group';
    }

    dispatch(actionToDispatch)
    .unwrap()
    .then(() => toast.success(successMessage))
    .catch((e) => toast.error(e.response.data.message));
  };

  const handleGoToGroupClick = () => navigate(`/groups/${id}`);

  return (<Flex justifyContent="space-between"
                alignItems="start"
                py={2}
                px={4}
                border={isOpen ? '2px solid rgb(128, 90, 213)' : '2px solid transparent'}
                borderRadius={'7px'}>
    <Flex direction={'column'} width={'100%'}
          onClick={toggle}
          cursor={'pointer'}>
      <Flex alignItems="center"
            justifyContent={'space-between'}
            height={9}
      >
        <Text fontSize="xl" fontWeight={'bold'}>{name}</Text>
        <Text mr={4}>Members: {users.length}</Text>
      </Flex>
      {isOpen && <>
        <Text fontSize="xl">List of members:</Text>
        <UnorderedList marginLeft={8} spacing={2}>
          {users.map(({
            id,
            username,
          }) => <ListItem key={id}>
            {username}
          </ListItem>)}
        </UnorderedList></>}
    </Flex>
    <Flex gap={4}>
      {isMember && <Button
        colorScheme={'purple'}
        py={4}
        onClick={handleGoToGroupClick}>
        Open group
      </Button>}
      <Button
        width={100}
        colorScheme={isMember ? 'red' : 'green'}
        onClick={handleJoinGroupClick}
      >
        {isMember ? 'Leave' : 'Join'}
      </Button>
    </Flex>
  </Flex>);
}
