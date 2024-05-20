import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { TasksOperations } from '../src/redux/tasks/operations.js';
import DateFormatters from '../src/utils/date-format.js';
import { addDays, subHours } from 'date-fns';

const useFormFilter = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    startDate: DateFormatters.formatWithDefault(addDays(new Date(), 1)),
    endDate: DateFormatters.formatWithDefault(addDays(new Date(), 2)),
  };

  const handleSubmit = (values, formikHelpers) => {
    const formattedStartDate = DateFormatters.formatWithDefault(subHours(values.endDate,
      3,
    ));

    dispatch(TasksOperations.fetchAllTasks({
      query: values.name,
      start_date: formattedStartDate,
    }));
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
