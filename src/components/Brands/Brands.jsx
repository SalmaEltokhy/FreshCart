import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import {Helmet} from "react-helmet";


export default function Brands() {


function getAllBrands(){
return  axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)

}
let{isError, isLoading, error, data}=useQuery({
queryKey:['allBrands'],
queryFn: getAllBrands,
});


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
                <title>Brands</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

</div>

    <h2 className='text-center capitalize text-emerald-600 pt-10 text-4xl font-semibold my-4  md:mt-10 lg:pt-10 lg:my-4'>all brand</h2>
   <div className='row'>
{data?.data?.data?.map((brand)=><div key={brand?._id} className='w-full md:w-1/3 lg:w-1/4'>
<div className='mx-2 my-2'>
<div className='p-3'>
<img src={brand?.image} alt={brand.name} className='w-full' />
<p className='text-black text-center text-xl'>{brand?.name}</p>

</div>

</div>


</div>)}
   </div>
   </>
  

}
