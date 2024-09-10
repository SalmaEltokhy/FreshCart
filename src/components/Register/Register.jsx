import axios from 'axios';
import { useFormik } from 'formik'
import React, {  useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext';
import {Helmet} from "react-helmet";



export default function Register() {

  
let {userLogin,setuserLogin}=useContext(UserContext)
const navigate = useNavigate()
const [ApliError,setApliError]=useState('')
const [isLoading,setisLoading]=useState(false)

   function handleRegister(values){
    setisLoading(true)
   axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)

    .then((res)=>{
      setisLoading(false)
      if(res.data.message=='success'){
        localStorage.setItem('userToken', res.data.token)
        setuserLogin(res.data.token)
        navigate('/')
      }
    })
    .catch((res)=>{
      setisLoading(false)
      setApliError(res.response.data.message)
    })
  
   
    
    }

let validationSchema= Yup.object().shape({
  name:Yup.string().min(3,'min length is 3').max(10,'max length is 10').required('name is required'),
  email:Yup.string().email('invalid email').required('email is required'),
  phone:Yup.string().matches(/^01[0125][0-9]{8}$/,'invalid phone number').required('phone is required'),
  password:Yup.string().matches(/^[A-Za-z0-9]{6,10}$/,'password should be between 6 and 10 char').required('password is required'),
  rePassword:Yup.string().oneOf([Yup.ref('password')],'rePassword and password not the same').required('rePassword is required')
})


    let formik = useFormik({
        initialValues: {
            name:'',
            email:'',
            phone:'',
            password:'',
            rePassword:'',
        },
        validationSchema,
        onSubmit:handleRegister,
    }
     
    )




  return <>

<div>
<Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

</div>

<div className='pt-10'>
  {ApliError?<div className='w-1/2 mx-auto text-red-700 font-bold p-3 text-xl mt-5'>
    {ApliError}
  </div>:null}
 <h2 className='font-bold text-4xl text-emerald-600 uppercase my-4  md:pt-10 lg:my-5'>Register Now</h2>
  <form className="max-w-lg mx-auto mt-8" onSubmit={formik.handleSubmit}>
    <div className="relative z-0 w-full mb-9 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-200 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="name" className="left-0 peer-focus:font-medium absolute text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
      {formik.errors.name&& formik.touched.name?(
        <span className='text-red-500'>{formik.errors.name}</span>
      ):null}
  </div>



    <div className="relative z-0 w-full mb-9 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-200 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
    <label htmlFor="email" className="left-0 peer-focus:font-medium absolute text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
    {formik.errors.email&& formik.touched.email?(
        <span className='text-red-500'>{formik.errors.email}</span>
      ):null}
  </div>

  <div className="relative w-full mb-9 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-200 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="phone" className="left-0 peer-focus:font-medium absolute text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>
      {formik.errors.phone&& formik.touched.phone?(
        <span className='text-red-500'>{formik.errors.phone}</span>
      ):null}
  </div>
  <div className="relative z-0 w-full mb-9 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-200 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="password" className="left-0 peer-focus:font-medium absolute text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
      {formik.errors.password&& formik.touched.password?(
        <span className='text-red-500'>{formik.errors.password}</span>
      ):null}
  </div>
  <div className="relative z-0 w-full mb-9 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-200 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="rePassword" className="left-0 peer-focus:font-medium absolute text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your RePassword</label>
      {formik.errors.rePassword&& formik.touched.rePassword?(
        <span className='text-red-500'>{formik.errors.rePassword}</span>
      ):null}
  </div>
  <div className='text-left'>
  <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"> 
    {isLoading?<i className='fas fa-spinner fa-spin'></i>:'Register'} </button>
  <Link to={"/login"}> <span className='text-blue-500 underline pl-4'>do you have an account? Login Now</span></Link>
  </div>
</form>
</div>
 
  
  </>
}
