import axios from 'axios';
import { useFormik } from 'formik'
import React, {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";



export default function ResetCode() {

  
const navigate = useNavigate()
const [ApliError,setApliError]=useState('')
const [isLoading,setisLoading]=useState(false)

   function handResetcode(values){
    setisLoading(true)
   axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
   .then((res)=>{
 if(res.data.status == 'Success'){
    setisLoading(false)
navigate('/resetpassword')
 }
  })
  .catch((res)=>{
    setisLoading(false)
    setApliError(res?.response?.data?.message)
  })
   }
  
  



    let formik = useFormik({
        initialValues: {
            resetCode:'',
           
        },
     
        onSubmit:handResetcode,
    }
     
    )



    
  return <>

<div>
<Helmet>
                <meta charSet="utf-8" />
                <title>ResetCode</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

</div>

<div className='py-10'>
  {ApliError?<div className='w-1/2 mx-auto text-red-700 font-bold p-3 text-xl mt-5'>
    {ApliError}
  </div>:null}
 <h2 className='font-bold text-4xl text-emerald-600 uppercase mt-10  md:pt-10 lg:mt-10'>reset your account password</h2>
  <form className="max-w-lg mx-auto mt-10" onSubmit={formik.handleSubmit}>
 
    <div className="relative z-0 w-full mb-9 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} type="text" name="text" id="text" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-200 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
    <label htmlFor="text" className="left-0 peer-focus:font-medium absolute text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">resetCode</label>
    {formik.errors.resetCode&& formik.touched.resetCode?(
        <span className='text-red-500'>{formik.errors.email}</span>
      ):null}
  </div>
  
 
  
  <div className='text-left'>
  <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"> 
    {isLoading?<i className='fas fa-spinner fa-spin'></i>:'verify'} </button>
  </div>
</form>
</div>
 
  
  </>
}
