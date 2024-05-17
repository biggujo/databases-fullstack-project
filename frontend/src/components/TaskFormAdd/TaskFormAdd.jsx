import React from 'react';
import useTaskAddForm from '../../../hooks/index.js';
import TaskForm from '../TaskForm/index.js';

export default function TaskFormAdd() {
  const formik = useTaskAddForm();

  return (<TaskForm formik={formik} />);
}
