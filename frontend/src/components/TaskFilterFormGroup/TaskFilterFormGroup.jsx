import React from 'react';
import useFormFilter from '../../hooks/useFormFilter.js';
import TaskFilterForm from '../TaskFilterForm/TaskFilterForm.jsx';
import { GroupTasksOperations } from '../../redux/groupTasks/operations.js';

export default function TaskFilterFormGroup({ groupId }) {
  const formik = useFormFilter({ operations: GroupTasksOperations(groupId) });

  return (<TaskFilterForm formik={formik} />);
}
