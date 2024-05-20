import React from 'react';
import { FormikProvider, useFormik } from 'formik';
import {
  Box, Button, Flex, FormControl, FormLabel, Input, VStack, Text, Link,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UserOperations from '../redux/auth/operations.js';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (values.email.length < 6) {
        errors.username = 'Email must be at least 6 characters long';
      }
      if (!values.username) {
        errors.username = 'Required';
      } else if (values.username.length < 6) {
        errors.username = 'Username must be at least 6 characters long';
      }
      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must contain at least 6 characters';
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords must match';
      }
      return errors;
    },
    onSubmit: async (values) => {
      await dispatch(UserOperations.register(values)).unwrap();
      navigate('/tasks');
    },
  });

  return (<FormikProvider value={formik}>
    <Flex align="center" justify="center" py={'100'}>
      <Box bg="white" p={4} width={320} rounded="md">
        <Text fontSize={'36px'} mb={4}>{t('signUpForm')}</Text>
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl
              isInvalid={formik.errors.email && formik.touched.email}>
              <FormLabel htmlFor="email">{t('email')}</FormLabel>
              <Input
                id="email"
                name="email"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <Box color="red">{formik.errors.email}</Box>)}
            </FormControl>
            <FormControl
              isInvalid={formik.errors.username && formik.touched.username}>
              <FormLabel htmlFor="username">{t('enterUsername')}</FormLabel>
              <Input
                id="username"
                name="username"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.errors.username && formik.touched.username && (
                <Box color="red">{formik.errors.username}</Box>)}
            </FormControl>
            <FormControl
              isInvalid={formik.errors.password && formik.touched.password}>
              <FormLabel htmlFor="password">{t('createPassword')}</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                variant="filled"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <Box color="red">{formik.errors.password}</Box>)}
            </FormControl>
            <FormControl
              isInvalid={formik.errors.confirmPassword && formik.touched.confirmPassword}>
              <FormLabel
                htmlFor="confirmPassword">{t('confirmPassword')}</FormLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                variant="filled"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                <Box color="red">{formik.errors.confirmPassword}</Box>)}
            </FormControl>
            <Button type="submit" colorScheme="purple" width="full">
              {t('signUp')}
            </Button>
          </VStack>
          <br />
          <br />
          <Link href={'/signup'}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Already
            have an
            account? Sign in</Link>
        </form>
      </Box>
    </Flex>
  </FormikProvider>);
}
