import React, { createContext } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { WishlistContex } from '../../Context/WishlistContex'
import { useEffect } from 'react'
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContex'
import {Helmet} from "react-helmet";



export default function Wishlist() {


let{getLoggedUserWishlist,deleteItemWishlist}=useContext(WishlistContex)
const [Wishlist, setWishlist] = useState(null)
const [loading, setloading] = useState(false)
const [currentId, setcurrentId] = useState(0)
let{addProductTocard,numberItems, setnumberItems}=useContext(CartContext)



    async function getWishlistItem(){
        let response=  await getLoggedUserWishlist()
        console.log(response)
        if(response?.data?.status=="success"){
          setWishlist(response?.data?.data)}
      
        }

        async function deleteWishlistItem(productId){
              let response = await deleteItemWishlist(productId)  
              console.log(response.data.data) 
              if(response?.data?.status=='success'){
                setWishlist( response?.data?.data)
                toast.success(response?.data?.message)
                getWishlistItem()
              
              }else{
                toast.error(response?.data?.message)
               
              }
            }

            async function addTocart(id){
              setcurrentId(id)
              setloading(true)
             let response = await addProductTocard(id)
             if(response.data.status=='success'){
              setnumberItems(numberItems + 1)
            toast.success(response.data.message);
            setloading(false)
             }else{
            toast.error(response.data.message);
            setloading(false)
             }
            }


    useEffect(()=>{
          getWishlistItem()
          },[])

  return <>
<div>
<Helmet>
                <meta charSet="utf-8" />
                <title>Wishlist</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

</div>
{Wishlist?.length>0?<>
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <div className='text-center mx-auto my-5'> 
  <h2 className='text-3xl text-emerald-600 font-bold capitalize mt-10 py-5  md:pt-10 lg:pt-5'>my wish list</h2>

  </div>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          Image
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
        Price
        </th>
        <th scope="col" className="px-6 py-3">
        <i className="fa-solid fa-trash text-red-600"></i> Action
        </th>
        <th scope="col" className="px-6 py-3">
        <i className="fa-solid fa-cart-shopping text-emerald-600"></i> Action
        </th>
       
      </tr>
    </thead>
    <tbody>
        {Wishlist?.map((product)=>
           <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={product?._id}>
        <td className="p-4">
          <img src={product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {product?.title}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
         {product?.price} $
        </td>
        <td className="px-6 py-4">
          <span onClick={()=>deleteWishlistItem(product?._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"><i className="fa-solid fa-trash "></i> Remove</span>
        </td>
        <td className="px-6 py-4">
        <button onClick={()=>addTocart(product.id)} className='text-white bg-emerald-600 px-4 py-2 rounded-lg w-full'>
        {loading && currentId == product.id? <i className='fas fa-spinner fa-spin'></i>: <i className="fa-solid fa-cart-shopping"></i>}
      </button> 
      </td>
      </tr>
     
)}
    </tbody>
   
  </table>
  
</div>

</>:<h1 className='text-3xl text-red-800 font-bold text-center my-10 capitalize pt-5  md:pt-10 lg:pt-5'>there is not wishlist</h1>}

  
  
  
  
  </>
}
