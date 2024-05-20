import React from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import UserOperations from '../redux/auth/operations.js';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SignInForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.username) {
        errors.username = t('required');
      } else if (values.username.length < 6) {
        errors.username = t('usernameTooShort');
      }
      if (!values.password) {
        errors.password = t('required');
      } else if (values.password.length < 6) {
        errors.password = t('passwordTooShort');
      }
      return errors;
    },
    onSubmit: async (values) => {
      await dispatch(UserOperations.login(values)).unwrap();
      navigate('/tasks');
    },
  });

  return (<Flex align="center" justify="center" py={'100'}>
    <Box bg="white" p={4} width={320} rounded="md">
      <form onSubmit={formik.handleSubmit}>
        <Text fontSize={'36px'} mb={4}>{t('signInForm')}</Text>
        <VStack spacing={4} align="flex-start">
          <FormControl
            isInvalid={formik.errors.username && formik.touched.username}>
            <FormLabel htmlFor="username">{t('username')}</FormLabel>
            <Input
              id="username"
              name="username"
              type="username"
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
            <FormLabel htmlFor="password">{t('password')}</FormLabel>
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
          <Checkbox
            id="rememberMe"
            name="rememberMe"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isChecked={formik.values.rememberMe}
            colorScheme="purple"
          >
            {t('rememberMe')}
          </Checkbox>
          <Button type="submit" colorScheme="purple" width="full">
            {t('login')}
          </Button>
        </VStack>
        <br />
        <br />
        <Link href={'/signup'}>&nbsp;&nbsp;&nbsp;Don't have an
          account? Sign up
          now</Link>
      </form>
    </Box>
  </Flex>);
}
