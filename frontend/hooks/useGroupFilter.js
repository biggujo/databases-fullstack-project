import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const useGroupFilter = ({ operations }) => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    members: 0,
    order: 'asc',
  };

  const handleSubmit = (values, formikHelpers) => {
    dispatch(operations.fetchAllGroups({
      query: values.name,
      n: values.members,
      order: values.order,
    }));
  };

  const validationSchema = Yup.object({
    members: Yup.number().label('Members amount').min(0),
  });

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema,
  });

  return formik;
};

export default useGroupFilter;
