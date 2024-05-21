import React, { useContext, useEffect } from 'react';
import useTaskFormUpdate from '../../../hooks/useTaskFormUpdate.js';
import TaskForm from '../TaskForm/index.js';
import {
  TaskUpdateTimestampContext,
} from '../../providers/TaskUpdateTimestampProvider.jsx';
import { TasksOperations } from '../../redux/tasks/operations.js';

export default function TaskFormUpdate({
  initialValues,
  operations,
}) {
  const [_, setLatestUpdate] = useContext(TaskUpdateTimestampContext);
  const handleSubmit = () => setLatestUpdate(Date.now());

  const formik = useTaskFormUpdate(operations.updateById,
    initialValues,
    handleSubmit,
  );

  return (<TaskForm formik={formik} initialValues={initialValues} />);
}
