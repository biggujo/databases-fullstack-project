import React from 'react';
import { useField } from 'formik';
import DatePicker from 'react-datepicker';

const DatePickerField = ({ ...props }) => {
  const [field, , { setValue }] = useField(props);
  return (<DatePicker
    {...field}
    {...props}
    selected={(field.value && new Date(field.value)) || null}
    onChange={(val) => {
      setValue(val);
    }}
  />);
};

export default DatePickerField;
