import React from 'react';
import {
  Button, Flex, FormControl, FormLabel, Input, Text,
} from '@chakra-ui/react';
import { FormikProvider } from 'formik';
import useGroupFormAdd from '../../hooks/useGroupFormAdd.js';
import { useTranslation } from 'react-i18next';

export default function GroupFormAdd() {
  const formik = useGroupFormAdd();
  const { t } = useTranslation();

  return (<FormikProvider value={formik}>
    <Flex as={'form'}
          gap={4}
          alignItems={'end'}
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
          name={'name'}
          placeholder={t('groupNamePlaceholder')}
          {...formik.getFieldProps('name')}
        />
      </FormControl>
      <Button
        type={'submit'}
        bg="purple.500"
        color="white"
        paddingInline={8}
        _hover={{ bg: 'purple.800' }}
      >
        {t('createGroup')}
      </Button>
    </Flex>
    {formik.errors.name && formik.touched.name ? (
      <Text color={'red'}>{formik.errors.name}</Text>) : null}
  </FormikProvider>);
}
