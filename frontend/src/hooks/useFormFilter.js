import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import DateFormatters from '../utils/date-format.js';
import { subHours } from 'date-fns';

const useFormFilter = ({ operations }) => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    startDate: '',
    endDate: '',
    status: 'in_progress',
    sortDeadlines: 'asc',
  };

  const handleSubmit = (values, formikHelpers) => {
    let formattedStartDate;
    let formattedEndDate;

    if (values.startDate) {
      formattedStartDate = DateFormatters.formatWithDefault(subHours(values.startDate,
        3,
      ));
    } else {
      formattedStartDate = '1970-01-01';
    }

    if (values.endDate) {
      formattedEndDate = DateFormatters.formatWithDefault(subHours(values.endDate,
        3,
      ));
    } else {
      formattedEndDate = '2037-12-31';
    }

    dispatch(operations.fetchAllTasks({
      query: values.name,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      status: values.status,
      sort_deadline: values.sortDeadlines,
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
