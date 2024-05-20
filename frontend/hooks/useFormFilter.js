import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { TasksOperations } from '../src/redux/tasks/operations.js';

const useFormFilter = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
  };

  const handleSubmit = (values, formikHelpers) => {
    dispatch(TasksOperations.fetchAllTasks({
      query: values.name,
    }));

    formikHelpers.resetForm();
  };

  const validationSchema = Yup.object({});

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema,
  });

  return formik;
};

export default useFormFilter;
