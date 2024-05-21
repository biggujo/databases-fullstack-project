import React from 'react';
import useFormFilter from '../../hooks/useFormFilter.js';
import { TasksOperations } from '../../redux/tasks/operations.js';
import TaskFilterForm from '../TaskFilterForm/TaskFilterForm.jsx';

export default function TaskFilterFormOwn() {
  const formik = useFormFilter({ operations: TasksOperations });

  return (<TaskFilterForm formik={formik} />);
}
