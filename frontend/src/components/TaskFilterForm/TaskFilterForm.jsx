import React from 'react';
import { FormikProvider } from 'formik';
import {
  Button, Flex, FormControl, FormLabel, Input, Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import useFormFilter from '../../../hooks/useFormFilter.js';

export default function TaskFilterForm() {
  const formik = useFormFilter();
  const { t } = useTranslation();

  return (<FormikProvider value={null}>
    <Flex as={'form'}
          gap={4}
          alignItems={'bottom'}
          onSubmit={(event) => {
            event.preventDefault();
            formik.handleSubmit();
          }}>
      <FormControl>
        <FormLabel fontSize={'xl'}>
          <Flex gap={2}>
            <span>{t('name')}</span>
            <Text color={'red'}> *</Text>
          </Flex>
        </FormLabel>
        <Input
          name="name"
          type="text"
          size={'lg'}
          bgColor={'white'}
          placeholder={t('placeholderText')}
          autoComplete={'off'}
          isRequired
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </FormControl>
      <Button type={'submit'}
              alignSelf={'start'}
              bg="purple.500"
              color="white"
              _hover={{ bg: 'purple.800' }}>
        {t('submit')}
      </Button>
      <Button onClick={() => {
        formik.resetForm();
        formik.submitForm();
      }}>{t('clear')}</Button>
    </Flex>
  </FormikProvider>);
}
