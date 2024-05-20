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
    startDate: '',
    endDate: '',
    status: '',
  };

  const handleSubmit = (values, formikHelpers) => {
    console.log(values);
    let formattedStartDate;
    let formattedEndDate;

    if (values.startDate.length > 0) {
      formattedStartDate = DateFormatters.formatWithDefault(subHours(values.startDate,
        3,
      ));
    } else {
      formattedStartDate = '1970-01-01';
    }

    if (values.endDate.length > 0) {
      formattedEndDate = DateFormatters.formatWithDefault(subHours(values.endDate,
        3,
      ));
    } else {
      formattedEndDate = '2037-12-31';
    }

    dispatch(TasksOperations.fetchAllTasks({
      query: values.name,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      status: values.status,
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
