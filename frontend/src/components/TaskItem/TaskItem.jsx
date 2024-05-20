import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Box, Checkbox, Flex, IconButton, Text,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { format, isAfter } from 'date-fns';
import useToggle from '../../../hooks/useToggle.js';
import TaskFormUpdate from '../TaskFormUpdate/index.js';
import DateFormatters from '../../utils/date-format.js';
import {
  TaskUpdateTimestampContext,
} from '../../providers/TaskUpdateTimestampProvider.jsx';
import { useTranslation } from 'react-i18next';
import SubtaskList from '../SubtaskList/SubtaskList.jsx';
import TaskList from '../TaskList/index.js';
import { selectSubtasks } from '../../redux/subtasks/selectors.js';
import SubtasksOperations from '../../redux/subtasks/operations.js';

export default function TaskItem({
  data: {
    id,
    name,
    description,
    isDone,
    deadline,
  },
  operations,
  updateForm: UpdateForm,
  shouldOpen,
  onShow,
  openable = true,
  isParent = false,
}) {
  const {
    isOpen,
    toggle,
    close,
  } = useToggle();
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const [latestUpdate] = useContext(TaskUpdateTimestampContext);
  const { t } = useTranslation();

  // Close on updated
  useEffect(() => {
    setIsEdit(false);
  }, [
    latestUpdate,
  ]);

  // Close if other is opened
  useEffect(() => {
    if (!shouldOpen) {
      close();
    }
  }, [shouldOpen]);

  const deadlineDate = deadline && new Date(deadline);
  const cutName = name.length > 13 ? `${name.slice(0, 13)}...` : name;
  const cutDescription = description && (description.length > 36 ? `${description.slice(0,
    36,
  )}...` : description);

  const isExpiredInProgress = !isDone && isAfter(new Date(), deadlineDate);

  return (<Flex gap={4}
                py={2}
                px={4}
                border={isOpen || isEdit ? '2px solid rgb(128, 90, 213)' : '2px solid transparent'}
                borderRadius={'7px'}
                justify={'space-between'}
                alignItems={'center'}
                direction={'column'}
                maxWidth={'100%'}
  >
    <MainData />
    {isParent && isOpen && <Box pl={6} width={'95%'}>
      <Text fontWeight={'bold'}>Subtasks:</Text>
      {<TaskList selector={selectSubtasks}
                 operations={SubtasksOperations(id)}
                 openable={false}
      />}
    </Box>}
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
        colorScheme={'purple'}
        isChecked={isDone}
        borderColor={'rgb(128, 90, 213)'}
        onChange={() => dispatch(operations.toggleCompletedById(id))}>
      </Checkbox>
      <Flex
        onClick={openable && !isEdit ? () => {
          toggle();
          onShow(id);
        } : null}
        fontSize={'xl'}
        color={isDone && 'gray'}
        position={'relative'}
        alignContent={isEdit && 'stretch'}
        flexDirection={isEdit && 'column'}
        justifyContent={'space-between'} width={'100%'}>
        {isEdit && <
          UpdateForm
          operations={operations}
          initialValues={{
            id,
            name,
            description,
            deadline: DateFormatters.formatWithDefault(deadline),
          }} />}
        {!isEdit && <>
          <Flex gap={2}
                direction={isOpen && 'column'}
                className={isDone && 'completed'}>
            <Text fontWeight={'bold'}>{isOpen ? name : cutName}</Text>
            <Box maxWidth={'500px'}>
              {description && <span>
              {isOpen && <>
                <Text textAlign={'justify'}>{description}</Text>
              </>}
                {!isOpen && <Text color={'gray'}>({cutDescription})</Text>}
            </span>}
            </Box>
          </Flex>
          {deadline && <Text color={isExpiredInProgress && 'red'}
          >
            {t('due')} {`${format(deadlineDate,
            'dd.MM.yyyy',
          )} ${t('at')} ${format(
            deadlineDate,
            'HH:mm',
          )}`}</Text>}
        </>}
      </Flex>
      <Flex gap={4}>
        <IconButton aria-label={t('editTask')}
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
        <IconButton aria-label={t('deleteTask')}
                    size={'sm'}
                    border="1px solid lightgray"
                    icon={<DeleteIcon color={'lightcoral'} />}
                    _hover={{
                      borderColor: 'lightcoral',
                    }}
                    onClick={() => dispatch(operations.deleteById(id))}
        />
      </Flex>
    </Flex>;
  }
}

