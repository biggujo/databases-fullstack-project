import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Checkbox, Flex, IconButton, Text,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { TasksOperations } from '../../redux/tasks/operations.js';
import { format, isAfter } from 'date-fns';
import useToggle from '../../../hooks/useToggle.js';
import TaskForm from '../TaskForm/index.js';
import TaskFormUpdate from '../TaskFormUpdate/index.js';
import DateFormatters from '../../utils/date-format.js';
import {
  TaskUpdateTimestampContext,
} from '../../providers/TaskUpdateTimestampProvider.jsx';

export default function TaskItem({
  id,
  name,
  description,
  isDone,
  deadline,
}) {
  const {
    isOpen,
    toggle,
  } = useToggle();
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const [latestUpdate] = useContext(TaskUpdateTimestampContext);

  useEffect(() => {
    setIsEdit(false);
  }, [latestUpdate]);

  const deadlineDate = new Date(deadline);
  const cutName = name.length > 13 ? `${name.slice(0, 13)}...` : name;
  const cutDescription = description.length > 36 ? `${description.slice(0,
    36,
  )}...` : description;

  const isExpiredInProgress = !isDone && isAfter(new Date(), deadlineDate);

  return (<Flex gap={4}
                py={2}
                px={4}
                border={isOpen || isEdit ? '2px solid rgb(227, 232, 239)' : '2px solid transparent'}
                borderRadius={'7px'}
                justify={'space-between'}
                alignItems={'center'}
                maxWidth={'100%'}
  >
    <MainData />
  </Flex>);

  function MainData() {
    return <Flex
      gap={4}
      flexGrow={1}
      width={'100%'}
      cursor={'pointer'}>
      <Checkbox
        height={'fit-content'}
        px={2}
        py={2}
        colorScheme={'teal'}
        isChecked={isDone}
        onChange={() => dispatch(TasksOperations.toggleCompletedById(id))}>
      </Checkbox>
      <Flex
        onClick={!isEdit ? toggle : null}
        fontSize={'xl'}
        color={isDone && 'gray'}
        position={'relative'}
        className={isDone && 'completed'}
        alignContent={isEdit && 'stretch'}
        flexDirection={isEdit && 'column'}
        justifyContent={'space-between'} width={'100%'}>
        {isEdit && <TaskFormUpdate initialValues={{
          id,
          name,
          description,
          deadline: DateFormatters.formatWithDefault(deadline),
        }} />}
        {!isEdit && <>
          <Flex gap={2}
                direction={isOpen && 'column'}>
            <Text fontWeight={'bold'}>{isOpen ? name : cutName}</Text>
            <Box maxWidth={'500px'}>
            <span>
              {isOpen && <>
                <Text textAlign={'justify'}>{description}</Text>
              </>}
              {!isOpen && <Text color={'gray'}>({cutDescription})</Text>}
            </span>
            </Box>
          </Flex>
          <Text color={isExpiredInProgress && 'red'}
          >
            Due {`${format(deadlineDate, 'dd.MM.yyyy')} at ${format(
            deadlineDate,
            'HH:mm',
          )}`}</Text>
        </>}
      </Flex>
      <Flex gap={4}>
        <IconButton aria-label={'Edit the task'}
                    size={'sm'}
                    border="1px solid lightgray"
                    icon={<EditIcon color={'orange'} />}
                    _hover={{
                      borderColor: 'orange',
                    }}
                    onClick={() => {
                      setIsEdit(prevState => !prevState);
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

