import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { TasksOperations } from '../src/redux/tasks/operations.js';
import { format } from 'date-fns';

const useTaskAddForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    description: '',
    deadline: '',
  };

  const handleSubmit = (values, formikHelpers) => {
    const taskToBeCreated = {
      ...values,
      deadline: format(new Date(), 'yyyy-MM-dd HH:mm'),
      isDone: false,
    };

    dispatch(TasksOperations.addTask(taskToBeCreated))
    .unwrap()
    .then(() => formikHelpers.resetForm());
  };

  const validationSchema = Yup.object({
    name: Yup.string().label('Name').min(3).max(128).required(),
    description: Yup.string().label('Description').min(3).max(512).required(), // deadline: Yup.string().label('Deadline').length(16).required(),
  });

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema,
  });

  return formik;
};

export default useTaskAddForm;
