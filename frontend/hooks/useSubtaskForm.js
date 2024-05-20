import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const useSubtaskForm = (operationOnSubmit, initialData, onSubmit) => {
  const dispatch = useDispatch();

  const initialValues = initialData ?? {
    name: '',
  };

  const handleSubmit = (values, formikHelpers) => {
    const taskToSubmit = {
      ...values,
    };

    let thunk;

    // Set data format to pass
    if (typeof initialData === 'undefined') {
      thunk = operationOnSubmit(taskToSubmit);
    } else {
      thunk = operationOnSubmit({
        id: initialData.id,
        data: taskToSubmit,
      });
    }

    dispatch(thunk)
    .unwrap()
    .then(() => {
      if (!initialData) {
        formikHelpers.resetForm();
      }
    })
    .finally(() => onSubmit && onSubmit());
  };

  const validationSchema = Yup.object({
    name: Yup.string().label('Name').min(3).max(128).required(),
  });

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema,
  });

  return formik;
};

export default useSubtaskForm;
