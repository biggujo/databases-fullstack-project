import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { GroupsOperations } from '../redux/groups/operations.js';
import toast from 'react-hot-toast';

const useGroupFormAdd = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
  };

  const handleSubmit = ({ name }, { resetForm }) => {
    dispatch(GroupsOperations.addGroup(name))
    .unwrap()
    .then(() => toast.success('A group has been added'))
    .catch((e) => toast.error(e.response.data.message))
    .finally(() => resetForm());
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

export default useGroupFormAdd;
