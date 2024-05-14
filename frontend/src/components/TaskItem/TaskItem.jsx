import React from 'react';
import {
  Checkbox, Flex, IconButton, Text,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { TasksOperations } from '../../redux/tasks/operations.js';
import { format } from 'date-fns';

export default function TaskItem({
  id,
  name,
  description,
  isDone,
  deadline,
}) {
  const dispatch = useDispatch();

  const deadlineDate = new Date(deadline);
  const cutDescription = description.length > 16 ? `${description.slice(0,
    16,
  )}...` : description;

  return (<Flex gap={4} padding={2} justify={'space-between'} maxWidth={'100%'}>
    <Flex gap={4} flexGrow={1} width={'100%'} cursor={'pointer'}>
      <Checkbox colorScheme={'teal'}
                isChecked={isDone}
                onChange={() => dispatch(TasksOperations.toggleCompletedById(id))}>
      </Checkbox>
      <Flex fontSize={'xl'}
            color={isDone && 'gray'}
            position={'relative'}
            className={isDone && 'completed'}
            justifyContent={'space-between'} width={'100%'}
            onClick={() => dispatch(TasksOperations.toggleCompletedById(id))}>
        <Flex gap={2}>
          <Text>{name}</Text>
          {cutDescription && <Text color={'gray'}>({cutDescription})</Text>}
        </Flex>
        <Text>Due {`${format(deadlineDate, 'dd.MM.yyyy')} at ${format(
          deadlineDate,
          'HH:mm',
        )}`}</Text>
      </Flex>
    </Flex>
    <IconButton aria-label={'Edit the task'}
                size={'sm'}
                border="1px solid lightgray"
                icon={<EditIcon color={'orange'} />}
                _hover={{
                  borderColor: 'orange',
                }}
    />
    <IconButton aria-label={'Delete the task'}
                size={'sm'}
                border="1px solid lightgray"
                icon={<DeleteIcon color={'lightcoral'} />}
                _hover={{
                  borderColor: 'lightcoral',
                }}
                onClick={() => dispatch(TasksOperations.deleteById(id))}
    />
  </Flex>);
}
