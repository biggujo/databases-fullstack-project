import React from 'react';
import { FormikProvider } from 'formik';
import {
  Box, Button, Flex, FormControl, FormLabel, Input, Select, Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import useFormFilter from '../../../hooks/useFormFilter.js';
import DatePicker from '../DatePicker/DatePicker.jsx';
import DateFormatters from '../../utils/date-format.js';

export default function TaskFilterForm() {
  const formik = useFormFilter();
  const { t } = useTranslation();

  return (<FormikProvider value={formik}>
    <Flex as={'form'}
          gap={4}
          alignItems={'bottom'}
          onSubmit={(event) => {
            event.preventDefault();
            formik.handleSubmit();
          }}>
      <FormControl>
        <FormLabel>
          <Flex gap={2}>
            <span>{t('name')}</span>
          </Flex>
        </FormLabel>
        <Input
          name="name"
          type="text"
          bgColor={'white'}
          fontSize={'14'}
          height={9}
          placeholder={t('placeholderText')}
          autoComplete={'off'}
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>
          <Flex gap={2}>
            <span>{t('startDate')}</span>
          </Flex>
        </FormLabel>
        <div>
          <DatePicker
            name={'startDate'}
            {...formik.getFieldProps('startDate')}
            timeInputLabel={t('startDate')}
            dateFormat={DateFormatters.DATE_FORMAT}
            showTimeInput
            wrapperClassName="date-picker"
            autoComplete="off"
          />
        </div>
        {formik.errors.startDate && formik.touched.startDate ? (
          <Text color={'red'}>{formik.errors.startDate}</Text>) : null}
      </FormControl>
      <FormControl>
        <FormLabel>
          <Flex gap={2}>
            <span>{t('endDate')}</span>
          </Flex>
        </FormLabel>
        <DatePicker
          name={'endDate'}
          {...formik.getFieldProps('endDate')}
          timeInputLabel={t('endDate')}
          dateFormat={DateFormatters.DATE_FORMAT}
          showTimeInput
          wrapperClassName="date-picker"
          autoComplete="off"
        />
        {formik.errors.endDate && formik.touched.endDate ? (
          <Text color={'red'}>{formik.errors.endDate}</Text>) : null}
      </FormControl>
      <FormControl>
        <FormLabel>
          <Flex gap={2}>
            <span>{t('status')}</span>
          </Flex>
        </FormLabel>
        <Select
          name={'status'}
          width={'fit-content'}
          fontSize={'14'}
          height={9}
          onChange={(e) => {
            formik.setFieldValue('status', e.target.value);
          }}
        >
          <option value={''}></option>
          <option value={'completed'}>{t('completed')}</option>
          <option value={'in_progress'}>{t('inProgress')}</option>
          <option value={'overdue'}>{t('overdue')}</option>
        </Select>
        {formik.errors.startDate && formik.touched.startDate ? (
          <Text color={'red'}>{formik.errors.startDate}</Text>) : null}
      </FormControl>
      <Button type={'submit'}
              alignSelf={'start'}
              bg="purple.500"
              color="white"
              _hover={{ bg: 'purple.800' }}>
        {t('search')}
      </Button>
      <Button onClick={() => {
        formik.resetForm();
        formik.submitForm();
      }}>{t('clear')}</Button>
    </Flex>
  </FormikProvider>);
}
