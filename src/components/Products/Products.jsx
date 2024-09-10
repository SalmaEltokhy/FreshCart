import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
 import useProducts from '../../Hooks/useProducts'
 import { useContext } from 'react'
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContex'
import { Link } from 'react-router-dom'
import { WishlistContex } from '../../Context/WishlistContex'
import {Helmet} from "react-helmet";
import { useEffect } from 'react'


export default function Products() {

  let{isError, isLoading,error, data}= useProducts();
  let {addProductTocard}= useContext(CartContext);
  const [loadingg, setloadingg] = useState(false)
  const [currentId, setcurrentId] = useState(0)
  let{addProductTowishlist,deleteItemWishlist}=useContext(WishlistContex)
  const [search, setSearch] = useState('')
  const [isInWishlist, setIsInWishlist] = useState(new Set())





  const filteredProduct=data?.data?.data.filter((product)=>{
    if(search==''){
      return product
    }else if( product.title.toLowerCase().includes(search.toLowerCase())){
      return product
    }
  })
  
  async function addTocart(id){
    setcurrentId(id)
    setloadingg(true)
   let response = await addProductTocard(id)
   if(response.data.status=='success'){
  toast.success(response.data.message);
  setloadingg(false)
   }else{
  toast.error(response.data.message);
  setloadingg(false)
   }
  }



  
 async function addTowishlist(id){
  let newWishlist = new Set(isInWishlist);

 if(newWishlist.has(id)){
let response= await deleteItemWishlist(id)

   if(response?.data?.status=='success'){
    newWishlist.delete(id)
//     setIsInWishlist(prev=>{
//  const updatedSet= new Set(prev);
//  updatedSet.delete(id);
//  return updatedSet
//    });
   toast.success('Prouduct removed from wishlist')
         localStorage.setItem("isInWishlist", JSON.stringify(response.data.data));

   }else{
     toast.error('Failedv to remove prouduct ')
   }
  }else{

let response = await addProductTowishlist(id)
  if(response?.data?.status=='success'){
      newWishlist.add(id)
      
  toast.success(response?.data?.message)
    // localStorage.setItem('isInWishlist', response.data.data )
    // setIsInWishlist(prev=> new Set(prev).add(id) );

      localStorage.setItem("isInWishlist", JSON.stringify(response.data.data));

}
else{
  toast.error('Failedv to added prouduct ');
  }
 }
      setIsInWishlist(newWishlist);

}




useEffect(() => {
  const savedWishlist = localStorage.getItem("isInWishlist");
  if (savedWishlist) {
    setIsInWishlist(new Set(JSON.parse(savedWishlist)));
  }
}, []);

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
                <title>Products</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

</div>




  <div className='mt-10 pt-5  md:pt-10 lg:pt-5'>
  <input
        type="text"
        placeholder=" Search..."
        onChange={(event) => setSearch(event.target.value)}
      />
  </div>
  <div className='row'>
    {filteredProduct.map((product)=>
    <div key={product.id} className='w-full md:w-1/4 lg:w-1/6'> 
    <div className="product my-2 p-2 relative">
 <Link to={`/productdetails/${product.id}/${product.category.name}`}>
      <img src={product.imageCover} alt="" className='w-full'/>
      <h3 className='text-emerald-600'>{product.category.name}</h3>
      <h3 className='font-semibold mb-1'>{product.title.split(' ').slice(0,2).join('')}</h3>
      <div className='flex justify-between p-3 items-center'>
        <div className='flex items-center '>
        <span className={product.priceAfterDiscount? 'line-through text-red-600 ':''}>{product.price} </span>
        <span className='ml-1'>{product.priceAfterDiscount}EGP</span>
        </div>
          <span className='flex items-center ml-3'><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage}</span>
      </div>
      </Link>
      <span>
    <i  className={`${isInWishlist.has(product.id)?'fa-solid text-red-600':'fa-regular text-black hover:text-red-600'} fa-heart fa-2x absolute m-4 btt `} onClick={()=>addTowishlist(product.id)}></i>
    </span>
      <button className='btn' onClick={()=>addTocart(product.id)}>
        {loadingg && currentId == product.id? <i className='fas fa-spinner fa-spin'></i>:'Add To Cart'}
        </button>
  </div>
  </div>)}
    </div>
 
  






  </>
  
  
}
