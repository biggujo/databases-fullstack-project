import React, { useEffect, useState } from 'react';
import useTaskAddForm from '../../../hooks/index.js';
import { FormikProvider } from 'formik';
import {
  Button, Flex, FormControl, FormHelperText, FormLabel, Input, Text, Textarea,
} from '@chakra-ui/react';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import DatePicker from '../DatePicker/';

export default function TaskAddForm() {
  const formik = useTaskAddForm();
  const [startDate, setStartDate] = useState(new Date());

  return (<FormikProvider value={formik}>
    <Flex as={'form'}
          gap={4}
          direction={'column'}
          onSubmit={(event) => {
            event.preventDefault();
            formik.handleSubmit();
          }}>
      <FormControl>
        <FormLabel fontSize={'xl'}>
          <Flex gap={2}>
            <span>Text</span>
            <Text color={'red'}> *</Text>
          </Flex>
        </FormLabel>
        <Input
          name="name"
          type="text"
          size={'lg'}
          placeholder="Buy groceries"
          isRequired
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.errors.name && formik.touched.name ? (
          <Text color={'red'}>{formik.errors.name}</Text>) : null}
      </FormControl>
      <FormControl>
        <FormLabel fontSize={'xl'}>
          <Flex gap={2}>
            <span>Description</span>
            <Text color={'red'}> *</Text>
          </Flex>
        </FormLabel>
        <Textarea
          name={'description'}
          placeholder="Three apples, four sausages..."
          size="lg"
          resize={'vertical'}
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        {formik.errors.description && formik.touched.description ? (
          <Text color={'red'}>{formik.errors.description}</Text>) : null}
      </FormControl>
      <FormControl>
        <FormLabel fontSize={'xl'}>
          <Flex gap={2}>
            <span>Deadline</span>
            <Text color={'red'}> *</Text>
          </Flex>
        </FormLabel>
        <DatePicker
          name={'deadline'}
          selected={startDate}
          {...formik.getFieldProps('deadline')}
          timeInputLabel="Time:"
          dateFormat="yyyy-MM-dd hh:mm"
          showTimeInput
          wrapperClassName="date-picker"
          autocomplete={'off'}
          onKeyDown={(event) => {
            event.preventDefault();
          }}
        />
        {formik.errors.deadline && formik.touched.deadline ? (
          <Text color={'red'}>{formik.errors.deadline}</Text>) : null}
      </FormControl>
      <Button type={'submit'}>
        Submit
      </Button>
    </Flex>
  </FormikProvider>);
}
