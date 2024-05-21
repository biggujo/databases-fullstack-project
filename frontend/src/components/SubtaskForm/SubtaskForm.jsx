import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormikProvider } from 'formik';
import {
  Box, Button, Flex, FormControl, FormLabel, Input, Text,
} from '@chakra-ui/react';

export default function SubtaskForm({ formik }) {
  const { t } = useTranslation();

  return (<FormikProvider value={formik}>
    <Flex as={'form'}
          gap={4}
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
        <Flex gap={4} alignItems={'center'}>
          <Box>
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
            {formik.errors.name && formik.touched.name ? (
              <Text color={'red'}>{formik.errors.name}</Text>) : null}
          </Box>
          <Button type={'submit'}
                  alignSelf={'start'}
                  mt={1}
                  bg="purple.500"
                  color="white"
                  _hover={{ bg: 'purple.800' }}>
            {t('submit')}
          </Button>
        </Flex>
      </FormControl>

    </Flex>
  </FormikProvider>);
}
