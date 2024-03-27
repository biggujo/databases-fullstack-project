import React from 'react';
import {
  Box, Button, Checkbox, Flex, IconButton, Text,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import {
  deleteTaskById, toggleCompletedById,
} from '../../redux/tasks/slice.js';
import { DeleteIcon } from '@chakra-ui/icons';

export default function TaskItem({
  id,
  text,
  isCompleted,
}) {
  const dispatch = useDispatch();

  return (<Flex gap={2} justify={'space-between'}>
    <Flex>
      <Checkbox colorScheme={'teal'}
                checked={isCompleted}
                onChange={() => dispatch(toggleCompletedById(id))}>
      </Checkbox>
      <Text
        textDecoration={isCompleted ? 'line-through' : 'none'}>{text}</Text>
    </Flex>
    <IconButton aria-label={'Delete the task'}
                size={'xs'}
                border="2px solid gray"
                icon={<DeleteIcon color={'gray'} />}
                colorScheme={'white'}
                _hover={{
                  borderColor: 'red',
                }}
                onClick={() => dispatch(deleteTaskById(id))}
    />
  </Flex>);
}
