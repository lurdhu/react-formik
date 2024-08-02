import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react';
import * as Yup from 'yup';

const initialValues = {
    name: '',
    email: '',
    password: '',
    gender: '',
    hobbies: [],
    phonenumber: ''
}

const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
    gender: Yup.string().required('Required'),
    hobbies: Yup.array().min(1, 'Select at least one hobby').required('Required'),
    phonenumber: Yup.string().min(10,"Select only 10 character").max(10,"select 10 char only").required('Required')
})

function RegisterForm() {

    const [data,setData] = useState([]);
    const [isEdit,setEdit] = useState(false);
    const [editIndex,setEditIndex] = useState(null);
    const [formValues,setFormValues] = useState(initialValues)
    
const onSubmit = (values,{resetForm} )=> {

    if(isEdit){
        const updatedata = [...data];
        updatedata[editIndex]=values;
        setData(updatedata);
        setEditIndex(null)
        setEdit(false);

    }else{
        setData(prevData => [...prevData, values]);
    }
    resetForm();
    setFormValues(initialValues);
    
}

function handleedit(index){
    setFormValues(data[index]);
    setEditIndex(index);
    setEdit(true);
}

console.log("data",data)
    return (
        <>
            <div>
                <h2>Student Register Form</h2>
                <Formik
                    initialValues={formValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    enableReinitialize={true}
                >
                    {
                        ({ errors, touched,isValid }) => {
                            return (
                                <Form className='mx-auto w-1/2 mt-10 border border-blue-300 p-5 rounded-sm'>
                                    <div className='flex flex-col gap-1'>
                                        <label className='text-lg font-semibold' htmlFor='name'>Name</label>
                                        <Field className='border border-black outline-none rounded-sm p-1 px-2  mb-3' type='text' name='name' id='name' />
                                        {touched.name && errors.name ? (
                                            <div className='text-red-600'>{errors.name}</div>
                                        ) : null}
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='text-lg font-semibold' htmlFor='email'>Email</label>
                                        <Field className='border border-black outline-none rounded-sm p-1 px-2  mb-3' type='email' name='email' id='email' />
                                        {touched.email && errors.email ? (
                                            <div className='text-red-600'>{errors.email}</div>
                                        ) : null}
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='text-lg font-semibold' htmlFor='password'>Password</label>
                                        <Field className='border border-black outline-none rounded-sm p-1 px-2  mb-3' type='password' name='password' id='password' />
                                        {touched.password && errors.password ? (
                                            <div className='text-red-600'>{errors.password}</div>
                                        ) : null}
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='text-lg font-semibold' htmlFor='gender'>Gender</label>
                                        <Field className='border border-black outline-none rounded-sm p-1 px-2  mb-3' name="gender" as="select">
                                            <option selected>Select a Gender</option>
                                            <option value="Female">Female</option>
                                            <option value="Male">Male</option>
                                            <option value="Other">Other</option>
                                        </Field>
                                        {touched.gender && errors.gender ? (
                                            <div className='text-red-600'>{errors.gender}</div>
                                        ) : null}
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='text-lg font-semibold' htmlFor='hobbies'> Hobbies: </label>
                                        <label>
                                            <Field name='hobbies' type='checkbox' value='dance' /> Dance
                                        </label>
                                        <label>
                                            <Field name='hobbies' type='checkbox' value='sing' /> Sing
                                        </label>
                                        <label>
                                            <Field name='hobbies' type='checkbox' value='athelets' /> Athelets
                                        </label>
                                        {touched.hobbies && errors.hobbies ? (
                                            <div className='text-red-600'>{errors.hobbies}</div>
                                        ) : null}
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='text-lg font-semibold' htmlFor='phonenumber'>PhoneNumber</label>
                                        <Field className='border border-black outline-none rounded-sm p-1 px-2  mb-3' name='phonenumber' type='number' id='phonenumber' />
                                        {touched.phonenumber && errors.phonenumber ? (
                                            <div className='text-red-600'>{errors.phonenumber}</div>
                                        ) : null}
                                    </div>
                                    <button className='bg-blue-400 text-white p-1 rounded-sm px-3 mt-4' type='submit' > {isEdit ? "Update" :"Submit"}</button>
                                </Form>
                            )
                        }
                    }

                </Formik>

                <div>
                    <table className='border border-gray-200 mt-10 mx-auto p-2'>
                        <thead>
                            <th className='border border-gray-200 p-2'>Name</th>
                            <th className='border border-gray-200 p-2'>Email</th>
                            <th className='border border-gray-200 p-2'>Hobbies</th>
                            <th className='border border-gray-200 p-2'>Gender</th>
                            <th className='border border-gray-200 p-2'>Phonenumber</th>
                            <th className='border border-gray-200 p-2'>Action</th>
                        </thead>
                        <tbody>
                    {
                        data.map((item,index)=>{
                            return (
                                <tr className='border border-gray-200'>
                                    <td className='border border-gray-200 p-2'>{item.name}</td>
                                    <td className='border border-gray-200 p-2'>{item.email}</td>
                                    <td className='border border-gray-200 p-2'>{item.hobbies.map((hobby)=>{return(<p>{hobby}</p>)})}</td>
                                    <td className='border border-gray-200 p-2'>{item.gender}</td>
                                    <td className='border border-gray-200 p-2'>{item.phonenumber}</td>
                                    <td className='border border-gray-200 p-2'><button onClick={()=>handleedit(index)} className='bg-blue-500 p-1 text-white rounded-sm px-3'>edit</button></td>
                                    
                                </tr>
                            )
                            
                        })
                    }
                    </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default RegisterForm