import React from 'react';
import { FormikProvider, useFormik } from 'formik';
import {
  Box, Button, Flex, FormControl, FormLabel, Input, VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UserOperations from '../redux/auth/operations.js';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

export default function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validate: (values) => {
      const errors = {};
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
      dispatch(UserOperations.register(values));
      // navigate('/tasks');
    },
  });

  return (<FormikProvider value={formik}>
    <Flex align="center" justify="center" py={'160'}>
      <Box bg="white" p={4} rounded="md">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl
              isInvalid={formik.errors.username && formik.touched.username}>
              <FormLabel htmlFor="username">Enter a username</FormLabel>
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
              <FormLabel htmlFor="password">Create a password</FormLabel>
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
              <FormLabel htmlFor="confirmPassword">Confirm your
                password</FormLabel>
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
              Sign Up
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  </FormikProvider>);
}
