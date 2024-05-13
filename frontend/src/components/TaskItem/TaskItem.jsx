import React from 'react';
import {
  Checkbox, Flex, IconButton, Text,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { DeleteIcon } from '@chakra-ui/icons';
import { TasksOperations } from '../../redux/tasks/operations.js';

export default function TaskItem({
  id,
  name,
  isDone,
}) {
  const dispatch = useDispatch();

  return (<Flex gap={4} padding={2} justify={'space-between'}>
    <Flex gap={4}>
      <Checkbox colorScheme={'teal'}
                isChecked={isDone}
                onChange={() => dispatch(TasksOperations.toggleCompletedById(id))}>
      </Checkbox>
      <Text fontSize={'xl'}
            textDecoration={isDone ? 'line-through' : 'none'}>{name}</Text>
    </Flex>
    <IconButton aria-label={'Delete the task'}
                size={'xs'}
                border="2px solid gray"
                icon={<DeleteIcon color={'gray'} />}
                colorScheme={'white'}
                _hover={{
                  borderColor: 'red',
                }}
      // onClick={() => dispatch(deleteTaskById(id))}
    />
  </Flex>);
}
