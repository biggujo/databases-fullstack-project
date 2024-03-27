import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addTask } from '../src/redux/tasks/slice.js';
import { nanoid } from 'nanoid';

const useTaskAddForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    text: '',
  };

  const handleSubmit = (values, formikHelpers) => {
    dispatch(addTask({
      id: nanoid(),
      text: values.text,
      isCompleted: false,
    }));
    formikHelpers.resetForm();
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  return formik;
};

export default useTaskAddForm;
