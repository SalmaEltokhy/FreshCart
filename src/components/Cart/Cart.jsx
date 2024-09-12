import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { CartContext } from '../../Context/CartContex'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";


export default function Cart() {
  let {getLoggedUserCart,updateCartProductQuantity,deleteCartItem,clearUserCart,numberItems, setnumberItems}=useContext(CartContext);
const [CartDetails, setCartDetails] = useState(null)
const [loadin, setloadin] = useState(false)
const [Cart, setCart] = useState(null)


 async function getCartItem(){
  let response=  await getLoggedUserCart()
  setCart(response?.data)
  if(response?.data?.status=="success"){
    setCartDetails(response?.data?.data)
  
  }
  }

  async function updateProduct(id , count){
    setloadin(true)
if(count==0){
  deleteItem(id)
}else{
  let response=  await updateCartProductQuantity(id,count)
  if(response?.data?.status=="success"){
    setCartDetails(response?.data?.data)
    console.log(response)
    toast.success('product updated successfully')
    setloadin(false)
  }else{
    toast.error('errrro')
    setloadin(false)
  }
}

   
    
    }

  async function deleteItem(productId){
   
      let response=  await deleteCartItem(productId)
      if(response?.data?.status=='success'){
        setnumberItems(numberItems-1)
        setCartDetails(response?.data?.data)
        toast.success('Product Removed Successfully')
       
      }else{
        toast.error('errrro')
       
      }
    
    }


    async function deleteAllItems() {
      setloadin(true)
      let response=  await clearUserCart()
      if(response?.data?.message=='success'){
        setCartDetails(null)
        setnumberItems(0)
        toast.success('Cart RemovedAll Successfully')
        setloadin(false)
        
      }else{
        toast.error('errrro')
        setloadin(false)
      }
   
    
    }
   


  useEffect(()=>{
    getCartItem()
  },[])

  return <>
<div>
<Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

</div>
{CartDetails?.products.length>0?<>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
<h2 className='text-center text-4xl font-semibold capitalize pt-10 text-emerald-600 my-3  md:pt-10 lg:pt-5'>Shopping cart</h2>
<h2 className='text-left text-xl text-emerald-600 font-bold capitalize flex items-center mt-5'><p className='text-black capitalize text-2xl px-2'>Total cart Item : </p> {Cart?.numOfCartItems}</h2>

  <div className='flex justify-between items-center mb-3'>
  <h2 className='text-left text-xl text-emerald-600 font-bold capitalize flex items-center '> <p className='text-black capitalize text-2xl px-2'>total price : </p>{CartDetails?.totalCartPrice} EGP</h2>
  <button onClick={deleteAllItems} className='text-red-500 border-2 border-red-500 rounded-md px-4 py-2 hover:bg-red-500 hover:text-white'>
    {loadin? <i className='fas fa-spinner fa-spin'></i>:'Clear Your Cart'}
    </button>


  </div>
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
        <th scope="col" className="px-6 py-3">
        <i className="fa-solid fa-trash text-red-600"></i>  Action
        </th>
      </tr>
    </thead>
    <tbody>
        {CartDetails?.products.map((product)=>
        <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>updateProduct(product.product.id,product.count -1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
               <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
             </svg>
            </button>
            <div>
            {loadin? <i className='fas fa-spinner fa-spin'></i>: <span>{product.count}</span>   }
                   
          </div>
            <button onClick={()=>updateProduct(product.product.id,product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
         {product.price} EGP
        </td>
        <td className="px-6 py-4">
          <span onClick={()=>deleteItem(product.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"><i className="fa-solid fa-trash"></i> Remove</span>
        </td>
      </tr>
        )}
    </tbody>
   
  </table>
  <Link to={`/checkout`}>
  <button className='text-emerald-500 border-2 border-emerald-500 rounded-md px-4 py-2 capitalize font-bold text-xl mt-2 w-full text-center butt'>
   checkout
    </button>
  </Link>
 
</div>
</>:<h1 className='text-3xl text-red-800 font-bold text-center my-10 capitalize pt-5 md:pt-10 lg:pt-5'>there is not items to show</h1>}






  </>
  
  
}
