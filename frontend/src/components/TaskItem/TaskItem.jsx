import React, { useEffect, useState } from 'react';
import {
  Box, Checkbox, Flex, IconButton, Text,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { TasksOperations } from '../../redux/tasks/operations.js';
import { format } from 'date-fns';
import useToggle from '../../../hooks/useToggle.js';

export default function TaskItem({
  id,
  name,
  description,
  isDone,
  deadline,
}) {
  const {
    isOpen,
    open,
    close,
    toggle,
  } = useToggle();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Toggle');
  }, [isOpen]);

  const deadlineDate = new Date(deadline);
  const cutDescription = description.length > 48 ? `${description.slice(0,
    48,
  )}...` : description;

  return (<Flex gap={4}
                py={2}
                px={4}
                border={isOpen && '2px solid rgb(227, 232, 239)'}
                borderRadius={'7px'}
                justify={'space-between'}
                alignItems={'center'}
                maxWidth={'100%'}>
    <Flex gap={4} flexGrow={1} width={'100%'} cursor={'pointer'}>
      {isOpen ? <MainDataOpened /> : <MainDataShort />}
    </Flex>
  </Flex>);

  function MainDataShort() {
    return <Flex
      gap={4}
      flexGrow={1}
      width={'100%'}
      cursor={'pointer'}>
      <Checkbox colorScheme={'teal'}
                isChecked={isDone}
                onChange={() => dispatch(TasksOperations.toggleCompletedById(id))}>
      </Checkbox><Flex onClick={toggle}
                       fontSize={'xl'}
                       color={isDone && 'gray'}
                       position={'relative'}
                       className={isDone && 'completed'}
                       justifyContent={'space-between'} width={'100%'}>
      <Flex gap={2}>
        <Text fontWeight={'bold'}>{name}</Text>
        {cutDescription && <Text color={'gray'}>({cutDescription})</Text>}
      </Flex>
      <Text>Due {`${format(
        deadlineDate,
        'dd.MM.yyyy',
      )} at ${format(deadlineDate, 'HH:mm')}`}</Text>
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
    </Flex>;
  }

  function MainDataOpened() {
    return <Flex
      gap={4}
      flexGrow={1}
      width={'100%'}
      cursor={'pointer'}>
      <Checkbox colorScheme={'teal'}
                isChecked={isDone}
                onChange={() => dispatch(TasksOperations.toggleCompletedById(id))}>
      </Checkbox>
      <Flex onClick={toggle}
            py={4}
            fontSize={'xl'}
            color={isDone && 'gray'}
            position={'relative'}
            className={isDone && 'completed'}
            justifyContent={'space-between'} width={'100%'}>
        <Flex gap={2} direction={'column'}>
          <Text fontWeight={'bold'}>{name}</Text>
          <Box textAlign={'justify'}
               maxWidth={'500px'}>
            {description && <Text><b>Description</b>: {description}</Text>}
          </Box>
        </Flex>
        <Text>Due {`${format(deadlineDate, 'dd.MM.yyyy')} at ${format(
          deadlineDate,
          'HH:mm',
        )}`}</Text>
      </Flex>
      <Flex py={4} gap={4}>
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
      </Flex>
    </Flex>;
  }
}

