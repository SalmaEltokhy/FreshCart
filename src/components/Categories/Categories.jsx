import axios from 'axios'
import React, { useState } from 'react'
import useCategories from '../../Hooks/useCategories'
import {Helmet} from "react-helmet";


export default function Categories() {
  let  {isError, isLoading, error, data}=useCategories()
 const [categories, setcategories] = useState(null)
     
    
    function getCategorie(id){
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
      .then((res)=>{
      
        setcategories(res?.data?.data)
       
      })
      .catch((res)=>res
      )
  }


      if(isError){
        return <h3>{error}</h3>
      }
      if(isLoading){
        return <div className="spinner"></div>
      }

    return <>
<div>
<Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

</div>

<div className='row my-10  md:pt-10 lg:my-10'>
 {data.data.data.map((ele)=><div key={ele?._id} className='w-full md:w-1/3 lg:w-1/4 cursor-pointer my-3'>
 <div className='border mx-2 rounded-lg'>
 <div onClick={()=>getCategorie(ele?._id)}>
<img src={ele?.image} alt={ele.name} className='w-full h-[200px] object-cover' />
<p className='text-emerald-600 text-center p-3 capitalize text-xl'>{ele?.name}</p>
</div>
 </div>




</div>)}
 </div>
 
 

  {categories?.length>0?<>
    <h2 className='text-emerald-600 text-2xl capitalize font-semibold p-3  md:pt-10 lg:p-3'>subcategories</h2>
    <div className='row items-center'>
{categories?.map((category)=><div key={category._id} className='w-full md:w-1/2 lg:w-1/3 my-3 '>
<div className='border mx-1 rounded-lg'>
<div className='category'>
  <p className='text-black text-center capitalize p-3 font-semibold text-2xl cursor-pointer'>{category.name}</p>

</div>

</div>


</div>)}
    </div>
  
  </>:null}
     
  
    
    
    </>
 
  
}
