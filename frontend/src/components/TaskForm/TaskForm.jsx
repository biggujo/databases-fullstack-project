import React from 'react';
import { FormikProvider } from 'formik';
import {
  Button, Flex, FormControl, FormLabel, Input, Text, Textarea,
} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import DatePicker from '../DatePicker/';
import DateFormatters from '../../utils/date-format.js';
import { useTranslation } from 'react-i18next';

export default function TaskForm({ formik }) {
  const { t } = useTranslation();

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
            <span>{t('text')}</span>
            <Text color={'red'}> *</Text>
          </Flex>
        </FormLabel>
        <Input
            name="name"
            type="text"
            size={'lg'}
            placeholder={t('placeholderText')}
            autoComplete={'off'}
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
            <span>{t('description')}</span>
            <Text color={'red'}> *</Text>
          </Flex>
        </FormLabel>
        <Textarea
            name={'description'}
            placeholder={t('placeholderDescription')}
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
            <span>{t('deadline')}</span>
            <Text color={'red'}> *</Text>
          </Flex>
        </FormLabel>
        <DatePicker
            name={'deadline'}
            {...formik.getFieldProps('deadline')}
            timeInputLabel={t('time')}
            dateFormat={DateFormatters.DATE_FORMAT}
            showTimeInput
            wrapperClassName="date-picker"
            autoComplete="off"
        />
        {formik.errors.deadline && formik.touched.deadline ? (
            <Text color={'red'}>{formik.errors.deadline}</Text>) : null}
      </FormControl>
      <Button type={'submit'}>
        {t('submit')}
      </Button>
    </Flex>
  </FormikProvider>);
}
