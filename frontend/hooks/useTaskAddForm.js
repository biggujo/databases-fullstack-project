import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { TasksOperations } from '../src/redux/tasks/operations.js';
import { format, subHours } from 'date-fns';
import DateFormatters from '../src/utils/date-format.js';

const useTaskAddForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    description: '',
    deadline: DateFormatters.formatWithDefault(new Date()),
  };

  const handleSubmit = (values, formikHelpers) => {
    const formattedDeadline = DateFormatters.formatWithDefault(subHours(values.deadline,
      3,
    ));

    const taskToBeCreated = {
      ...values,
      deadline: formattedDeadline,
      isDone: false,
    };

    dispatch(TasksOperations.addTask(taskToBeCreated))
    .unwrap()
    .then(() => formikHelpers.resetForm({
      values: {
        ...initialValues,
        deadline: values.deadline,
      },
    }));
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
