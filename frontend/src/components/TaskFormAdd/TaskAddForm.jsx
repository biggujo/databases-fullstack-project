import React from 'react';
import useTaskAddForm from '../../../hooks/index.js';
import { FormikProvider } from 'formik';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

export default function TaskAddForm() {
  const formik = useTaskAddForm();

  return (<FormikProvider value={formik}>
    <form onSubmit={(event) => {
      event.preventDefault();
      formik.handleSubmit();
    }}>
      <FormControl>
        <FormLabel>
          Text
        </FormLabel>
        <Input
          name="text"
          type="text"
          isRequired
          value={formik.values.text}
          onChange={formik.handleChange}
        />
      </FormControl>
      <Button type={'submit'}>
        Submit
      </Button>
    </form>
  </FormikProvider>);
}
