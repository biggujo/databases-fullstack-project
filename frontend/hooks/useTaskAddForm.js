import useTaskForm from './useTaskForm.js';
import { TasksOperations } from '../src/redux/tasks/operations.js';

const useTaskAddForm = () => useTaskForm(TasksOperations.addTask);

export default useTaskAddForm;
