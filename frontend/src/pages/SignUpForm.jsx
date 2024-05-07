import React from 'react';
import { useFormik } from "formik";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    VStack
} from "@chakra-ui/react";

export default function SignUpForm() {
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validate: (values) => {
            const errors = {};
            if (!values.username) {
                errors.username = 'Required';
            } else if (values.username.length < 3) {
                errors.username = 'Username must be at least 3 characters long';
            }
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
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
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        }
    });

    return (
        <Flex bg="gray.100" align="center" justify="center" h="100vh">
            <Box bg="white" p={4} rounded="md">
                <form onSubmit={formik.handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                        <FormControl isInvalid={formik.errors.username && formik.touched.username}>
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
                                <Box color="red">{formik.errors.username}</Box>
                            )}
                        </FormControl>
                        <FormControl isInvalid={formik.errors.email && formik.touched.email}>
                            <FormLabel htmlFor="email">Enter your email</FormLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                variant="filled"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.errors.email && formik.touched.email && (
                                <Box color="red">{formik.errors.email}</Box>
                            )}
                        </FormControl>
                        <FormControl isInvalid={formik.errors.password && formik.touched.password}>
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
                                <Box color="red">{formik.errors.password}</Box>
                            )}
                        </FormControl>
                        <FormControl isInvalid={formik.errors.confirmPassword && formik.touched.confirmPassword}>
                            <FormLabel htmlFor="confirmPassword">Confirm your password</FormLabel>
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
                                <Box color="red">{formik.errors.confirmPassword}</Box>
                            )}
                        </FormControl>
                        <Button type="submit" colorScheme="purple" width="full">
                            Sign Up
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
}
