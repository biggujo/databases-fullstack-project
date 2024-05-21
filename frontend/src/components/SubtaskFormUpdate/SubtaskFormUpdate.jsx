import React, { useContext } from 'react';
import {
  TaskUpdateTimestampContext,
} from '../../providers/TaskUpdateTimestampProvider.jsx';
import useSubtaskFormUpdate from '../../hooks/useSubtaskFormUpdate.js';
import SubtaskForm from '../SubtaskForm/index.js';

export default function SubtaskFormUpdate({
  initialValues,
  operations,
}) {
  const [_, setLatestUpdate] = useContext(TaskUpdateTimestampContext);

  const handleSubmit = () => setLatestUpdate(Date.now());

  const formik = useSubtaskFormUpdate(operations.updateById,
    initialValues,
    handleSubmit,
  );

  return (<SubtaskForm formik={formik} initialValues={initialValues} />);
}
