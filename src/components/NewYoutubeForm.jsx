import React, { useState } from 'react';
import { useFormik } from 'formik';


const initialValues = {
    name: '',
    email: '',
    channel: ''
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

function NewYoutubeForm() {
    const formik = useFormik({
        initialValues, 
        onSubmit,
        validate
    });

    console.log(formik.values)

    return (
        <>
            <p className='text-center text-xl text-blue-600 font-bold mt-5'> Youtupe Form </p>

            <form className='mx-auto w-80 mt-10 border border-blue-300 p-5 rounded-sm' onSubmit={formik.handleSubmit}>
                <div className='flex flex-col gap-1'>
                    <label className='text-lg font-semibold' htmlFor='name'>Name</label>
                    <input className='border border-black outline-none rounded-sm p-1  px-2 mb-3'
                        type='text'
                        name='name'
                        id='name'
                        {...formik.getFieldProps('name')}
                        // onChange={formik.handleChange}
                        // // to display the user only use in that field not to define another field of error coming 
                        // onBlur={formik.handleBlur}
                        // value={formik.values.name}
                    />
                    {/* Display the error messages */}
                    {formik.touched.name && formik.errors.name ? <div className='text-red-500 mb-1'>{formik.errors.name}</div> : null}
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='text-lg font-semibold' htmlFor='email'>Email</label>
                    <input className='border border-black outline-none rounded-sm p-1 px-2  mb-3'
                        type='email'
                        name='email'
                        id='email'
                        {...formik.getFieldProps('email')}
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        // value={formik.values.email}
                    />
                    {/* Display the error messages */}
                    {formik.touched.email &&  formik.errors.email ? <div className='text-red-500 mb-1'>{formik.errors.email}</div> : null}
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='text-lg font-semibold' htmlFor='channel'>Channel</label>
                    <input className='border border-black outline-none rounded-sm p-1 px-2  mb-3'
                        type='text'
                        name='channel'
                        id='channel'
                        {...formik.getFieldProps('channel')}
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        // value={formik.values.channel}
                    />
                    {/* Display the error messages */}
                    {formik.touched.channel &&  formik.errors.channel ? <div className='text-red-500 mb-1'>{formik.errors.channel}</div> : null}
                </div>
                <button className='bg-blue-400 text-white p-1 rounded-sm px-3 mt-4' type="submit"> Submit </button>
            </form>
        </>
    )
}

export default NewYoutubeForm;