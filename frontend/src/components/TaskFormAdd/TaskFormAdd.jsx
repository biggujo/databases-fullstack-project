import React from 'react';
import useTaskAddForm from '../../../hooks/index.js';
import TaskForm from '../TaskForm/index.js';

export default function TaskFormAdd({ operations }) {
  const formik = useTaskAddForm(operations.addTask);

  return (<TaskForm formik={formik} />);
}
