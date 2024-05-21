import React from 'react';
import useSubtaskAddForm from '../../hooks/useSubtaskAddForm.js';
import SubtaskForm from '../SubtaskForm/index.js';

export default function SubtaskFormAdd({ operations }) {
  const formik = useSubtaskAddForm(operations.addTask);

  return (<SubtaskForm formik={formik} />);
}
