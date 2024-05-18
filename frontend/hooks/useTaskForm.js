import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addDays, subHours } from 'date-fns';
import DateFormatters from '../src/utils/date-format.js';

const useTaskAddForm = (operationOnSubmit, initialData, onSubmit) => {
  const dispatch = useDispatch();

  const initialValues = initialData ?? {
    name: '',
    description: '',
    deadline: DateFormatters.formatWithDefault(addDays(new Date(), 1)),
  };

  const handleSubmit = (values, formikHelpers) => {
    const formattedDeadline = DateFormatters.formatWithDefault(subHours(values.deadline,
      3,
    ));

    const taskToSubmit = {
      ...values,
      deadline: formattedDeadline,
      isDone: false,
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
        formikHelpers.resetForm({
          values: {
            ...initialValues,
            deadline: values.deadline,
          },
        });
      }
    })
    .finally(() => onSubmit && onSubmit());
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
