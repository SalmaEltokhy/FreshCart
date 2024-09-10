import axios from 'axios';
import { useFormik } from 'formik'
import React, {  useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext';
import {Helmet} from "react-helmet";




export default function Login() {

  
let{userLogin,setuserLogin}=useContext(UserContext)
const navigate = useNavigate()
const [ApliError,setApliError]=useState('')
const [isLoading,setisLoading]=useState(false)

   function handleLogin(values){
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
  email:Yup.string().email('invalid email').required('email is required'),
  password:Yup.string().matches(/^[A-Za-z0-9]{6,10}$/,'password should be between 6 and 10 char').required('password is required'),
 
})


    let formik = useFormik({
        initialValues: {
            email:'',
            password:'',
        },
        validationSchema,
        onSubmit:handleLogin,
    }
     
    )



    
  return <>
<div>
<Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

</div>


<div className='pt-10'>
  {ApliError?<div className='w-1/2 mx-auto text-red-700 font-bold p-3 text-xl mt-5'>
    {ApliError}
  </div>:null}
 <h2 className='font-bold text-4xl text-emerald-600 uppercase my-4  md:pt-10 lg:my-4'>Login Now</h2>
  <form className="max-w-lg mx-auto mt-8" onSubmit={formik.handleSubmit}>
 
    <div className="relative z-0 w-full mb-9 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-200 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
    <label htmlFor="email" className="left-0 peer-focus:font-medium absolute text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
    {formik.errors.email&& formik.touched.email?(
        <span className='text-red-500'>{formik.errors.email}</span>
      ):null}
  </div>
  
  <div className="relative z-0 w-full mb-9 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-200 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="password" className="left-0 peer-focus:font-medium absolute text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
      {formik.errors.password && formik.touched.password?(
        <span className='text-red-500'>{formik.errors.password}</span>
      ):null}
  </div>
  
  <div className='text-left'>
  <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"> 
    {isLoading?<i className='fas fa-spinner fa-spin'></i>:'Register'} </button>
  </div>
  <Link to={"/register"}> <p className='text-black pl-4 pt-4'>don't you have an account?<span className='underline pl-4 hover:text-emerald-600'>Register Now</span> </p></Link>

  <Link to={'/forgetpassword'}><p className='text-black pl-4 underline pt-2 hover:text-emerald-600 '>forget your password ?</p></Link>
</form>
</div>
 
  
  </>
}
