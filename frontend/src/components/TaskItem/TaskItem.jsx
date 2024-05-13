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
  description,
  isDone,
  deadline,
}) {
  const dispatch = useDispatch();

  const deadlineDate = new Date(deadline);

  return (<Flex gap={4} padding={2} justify={'space-between'}>
    <Flex gap={4}>
      <Checkbox colorScheme={'teal'}
                isChecked={isDone}
                onChange={() => dispatch(TasksOperations.toggleCompletedById(id))}>
      </Checkbox>
      <Text fontSize={'xl'}
            textDecoration={isDone ? 'line-through' : 'none'}>
        <span>
          {name} (Desc.: {description}).
          Deadline: {`${deadlineDate.toLocaleDateString('uk-UA')} at ${deadlineDate.toLocaleTimeString(
          'uk-UA')}`}
        </span>
      </Text>
    </Flex>
    <IconButton aria-label={'Delete the task'}
                size={'xs'}
                border="2px solid gray"
                icon={<DeleteIcon color={'gray'} />}
                colorScheme={'white'}
                _hover={{
                  borderColor: 'red',
                }}
                onClick={() => dispatch(TasksOperations.deleteById(id))}
    />
  </Flex>);
}
