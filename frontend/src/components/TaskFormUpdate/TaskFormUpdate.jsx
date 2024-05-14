import React, { useContext, useEffect } from 'react';
import useTaskFormUpdate from '../../../hooks/useTaskFormUpdate.js';
import TaskForm from '../TaskForm/index.js';
import {
  TaskUpdateTimestampContext,
} from '../../providers/TaskUpdateTimestampProvider.jsx';

export default function TaskFormUpdate({
  initialValues,
}) {
  const [_, setLatestUpdate] = useContext(TaskUpdateTimestampContext);
  const handleSubmit = () => setLatestUpdate(Date.now());

  const formik = useTaskFormUpdate(initialValues, handleSubmit);

  return (<TaskForm formik={formik} initialValues={initialValues} />);
}
