
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import {Helmet} from "react-helmet";
import { Accordion } from "flowbite-react";

const AllOrders=()=> {
 const {id}=   jwtDecode(localStorage.getItem('userToken'))
 const [allOrder, setallOrder] = useState(null)
 const [load, setload] = useState(false)


async function getAllOrder(){
    setload(true)
try {
    const {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    console.log(data);
    setallOrder(data);
    setload(false)
} catch (error) {
    console.log(error)
    setload(false)

}
}

useEffect(()=>{
    getAllOrder()
},[])

if(load){
    return <div className="spinner"></div>
    
}
   
  return <>
<div>
<Helmet>
                <meta charSet="utf-8" />
                <title>AllOrders</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

</div>


  <h1 className='text-center capitalize text-emerald-600 pt-10 text-4xl font-semibold my-5  md:pt-10 lg:pt-10 lg:my-4 '>All Orders</h1>
  <Accordion> 
 
    {allOrder?.map((order)=><Accordion.Panel key={order._id}>
        <Accordion.Title className= {order.isPaid?'bg-emerald-950 mb-10 text-black hover:bg-emerald-900':'bg-red-900 text-white hover:bg-red-800'}> <h2 className=' capitalize'>Payment Method Type : {order.paymentMethodType}</h2> <h2 className=' capitalize'>isDelivered :  <span className={order.isDelivered.toString()?'text-red-700':'text-blue-700'}>{order.isDelivered.toString()} </span></h2>  <h2 className=' capitalize'>City :{order.shippingAddress.city}</h2> <h2 className=' capitalize'>ID : {order.id}</h2> </Accordion.Title>
    <h2 className='text-center text-xl capitalize font-semibold text-red-800 '>Total Order Price : {order.totalOrderPrice} EGP</h2>
 <Accordion.Content className='md:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
 <table className=" md:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
 <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          Image
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        
      </tr>
    </thead>
    <tbody className='w-full'>
  {order.cartItems.map((item)=><>
<tr key={item?._id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 w-flex items-center ">
<td className="p-4">
  <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
</td>
<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
{item?.product?.title}
</td>
<td className="px-6 py-4">
  <div className="flex items-center">
    <div>
    {item?.count}     
  </div>
  </div>
</td>
<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
 {item?.price} EGP
</td>

</tr>



        </>)}
        </tbody>
        </table>
        </Accordion.Content>
      </Accordion.Panel>

  )}
    
         
     
    
    </Accordion>


  </>
}
export default AllOrders