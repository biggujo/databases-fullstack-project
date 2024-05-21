import useTaskForm from './useTaskForm.js';
import { TasksOperations } from '../src/redux/tasks/operations.js';

const useTaskFormUpdate = (operation, initialValues, onSubmit) => useTaskForm(operation,
  initialValues,
  onSubmit,
);

export default useTaskFormUpdate;
