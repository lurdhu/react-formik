import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';


const initialValues = {
    name: '',
    email: '',
    channel: '',
    comment: '',
    address: '',
    social: {
        facebook: '',
        twitter: ''      // nested Objects
    },
    phonenumber : ['','']
}

const onSubmit = values => {
    console.log("values", values)
}

const validate = values => {
    // values.name values.email values.channel
    //errors.name errors.email errors.channel
    // errors.name = 'This field is required'

    let errors = {}

    if (!values.name) {
        errors.name = "Required**"
    }

    if (!values.email) {
        errors.email = "Required**"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email format'
    }

    if (!values.channel) {
        errors.channel = "Required**"
    }

    return errors
}

function NestedObjects() {


    // console.log(formik.values)

    return (
        <>
            <p className='text-center text-xl text-blue-600 font-bold mt-5'> Youtupe Form </p>

            <Formik
                initialValues={initialValues}
                validate={validate} onSubmit={onSubmit}>

                <Form className='mx-auto w-80 mt-10 border border-blue-300 p-5 rounded-sm'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-semibold' htmlFor='name'>Name</label>
                        <Field className='border border-black outline-none rounded-sm p-1  px-2 mb-3'
                            type='text'
                            name='name'
                            id='name'
                        />
                        {/* Display the error messages */}
                        <ErrorMessage name='name' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-semibold' htmlFor='email'>Email</label>
                        <Field className='border border-black outline-none rounded-sm p-1 px-2  mb-3'
                            type='email'
                            name='email'
                            id='email'
                        />
                        {/* Display the error messages */}
                        <ErrorMessage name='email' component='div' />  {/* it contain a div tag and also to render a propes values  */}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-semibold' htmlFor='channel'>Channel</label>
                        <Field className='border border-black outline-none rounded-sm p-1 px-2  mb-3'
                            type='text'
                            name='channel'
                            id='channel'
                            placeholder='Youtube channel name'
                        />
                        {/* Display the error messages */}
                        <ErrorMessage name='channel' >
                            {errormsg => <div className='text-red-500'>{errormsg}</div>}
                        </ErrorMessage>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-semibold' htmlFor='comment'>Comment</label>
                        <Field className='border border-black outline-none rounded-sm p-1 px-2  mb-3'
                            as='textarea'
                            name='comment'
                            id='comment'
                        />
                        {/* Display the error messages */}
                        {/* <ErrorMessage name='comment' /> */}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-semibold' htmlFor='comment'>Address</label>
                        <Field name='address'>
                            {
                                props => {
                                    const { field, form, meta } = props
                                    console.log(props)
                                    return (
                                        <div>
                                            <input type='text' id='address' {...field}  className='border border-black outline-none rounded-sm p-1 px-2  mb-3'/>
                                            {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                                        </div>
                                    )
                                }
                            }
                        </Field>
                    </div>

                    {/* Nested Objects */}
                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-semibold' htmlFor='facebook'>FaceBook Profile</label>
                        <Field className='border border-black outline-none rounded-sm p-1  px-2 mb-3'
                            type='text'
                            name='social.facebook'
                            id='facebook'
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-semibold' htmlFor='twitter'>Twitter Profile</label>
                        <Field className='border border-black outline-none rounded-sm p-1  px-2 mb-3'
                            type='text'
                            name='social.twitter'
                            id='twitter'
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-semibold' htmlFor='primaryph'>Primary Phone Number</label>
                        <Field className='border border-black outline-none rounded-sm p-1  px-2 mb-3'
                            type='text'
                            name='phonenumber[0]'
                            id='primaryph'
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-semibold' htmlFor='secondaryph'>Secondary Phone Number</label>
                        <Field className='border border-black outline-none rounded-sm p-1  px-2 mb-3'
                            type='text'
                            name='phonenumber[1]'
                            id='secondaryph'
                        />
                    </div>
                    <button className='bg-blue-400 text-white p-1 rounded-sm px-3 mt-4' type="submit"> Submit </button>
                </Form>
            </Formik> 
        </>
    )
}

export default NestedObjects;