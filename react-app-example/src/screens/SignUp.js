import React from 'react';
import { useState, useRef } from 'react';
import { VStack, HStack, Heading, Input, Flex, Box, Button, Alert, AlertIcon, FormLabel } from '@chakra-ui/react'
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const CustomTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <FormLabel htmlFor={props.id || props.name} pt='15px'>{label}</FormLabel>
            <Input className='text-input' {...field} {...props} />
            {meta.touched && meta.error ? (
                // <div className='error'>{meta.error}</div>
                <Alert status='info' variant='left-accent' borderRadius="sm">
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </>
    )
}

function SignUp() {
    const errRef = useRef();
    const successRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    return (
        <Formik
            initialValues={{
                username: '',
                fullname: '',
                email: '',
                password: '',
                cfmPassword: '',
            }}
            validationSchema={Yup.object({
                username: Yup.string()
                .min(4, 'Username must be at least 4 characters long')
                .required('Username is required'),
                fullname: Yup.string()
                .required('Please enter your first name'),
                email: Yup.string()
                .email('Invalid Email Address')
                .required('Email is required'),
                password: Yup.string()
                .min(8, 'Password is too short - should be 8 characters minimum.')
                .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Minimum eight characters, with at least one letter and one number')
                .required('Password is required'),
                cfmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Password and Confirm Password does not match')
                .required('Confirm Password is required')
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                const requestBody = values;
                axios.post('http://localhost:3001/users/', requestBody)
                .then((response) => {
                    console.log(response);
                    setSuccessMsg('Your account has been signed up successfully!');
                    resetForm();
                    setSubmitting(false);
                    setTimeout(() => {
                        window.location.href = '/login'
                    }, 2000)
                    
                })
                .catch((error) => {
                    if (error.response?.status === 409) {
                        setErrMsg('Username or Email is Taken');
                        setTimeout(() => {
                            window.location.reload();
                        }, 1500)
                    }
                    resetForm();
                    setSubmitting(false);
                })
            }}
        >
            {props => (
                <Flex bg="gray.50" align="center" justify="center" h="100vh">
                    <Box bg="white" w='60%' p={19} rounded="lg" shadow='md'>
                        <Form>
                            <Heading pl={7} pt={2}>Sign Up</Heading>
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                            <p ref={successRef} className={successMsg ? "successmsg" : "offscreen"}>{successMsg}</p>
                            <VStack align="stretch" p={7}>
                                <CustomTextInput 
                                    label="Username" 
                                    name="username" 
                                    type="text"
                                    placeholder="Enter Username"
                                />
                                <CustomTextInput 
                                    label="Full Name" 
                                    name="fullname" 
                                    type="text"
                                    placeholder="Enter Full Name"
                                />
                                <CustomTextInput 
                                    label="Email" 
                                    name="email" 
                                    type="text"
                                    placeholder="Enter Email Address"
                                />
                                <CustomTextInput 
                                    label="Password" 
                                    name="password" 
                                    type="password"
                                    placeholder="Enter Password"
                                />
                                <CustomTextInput 
                                    label="Confirm Password" 
                                    name="cfmPassword" 
                                    type="password"
                                    placeholder="Confirm Password"
                                />
                            </VStack>
                            <HStack spacing='20px' pt='10px' pb={2} pl={7}>
                                <Button type='submit'>{props.isSubmitting ? 'Loading...' : 'Submit'}</Button>
                                <Button type='reset'>Reset</Button>
                            </HStack>
                        </Form>
                    </Box>
                </Flex>
            )}
        </Formik>
    )
}

export default SignUp;