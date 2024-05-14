import useTaskForm from './useTaskForm.js';
import { TasksOperations } from '../src/redux/tasks/operations.js';

const useTaskFormUpdate = (initialValues, onSubmit) => useTaskForm(TasksOperations.updateById,
  initialValues,
  onSubmit,
);

export default useTaskFormUpdate;
