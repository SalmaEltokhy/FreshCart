import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { CartContext } from '../../Context/CartContex';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import Slider from 'react-slick';
import { WishlistContex } from '../../Context/WishlistContex';
import {Helmet} from "react-helmet";


export default function ProductDetails() {
  const [relatedProducts, setrelatedProducts] = useState([])
    const [product, setproduct] = useState(null)
    const [loading, setloading] = useState(false)
    const [currentId, setcurrentId] = useState(0)
    let {addProductTocard}= useContext(CartContext);
    let {id,category}=useParams()
let{addProductTowishlist,deleteItemWishlist}=useContext(WishlistContex)
const [isInWishlist, setIsInWishlist] = useState(new Set())


var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:2000,
  };

  async function addTocart(id){
    setcurrentId(id)
    setloading(true)
   let response = await addProductTocard(id)
   if(response.data.status=='success'){
  toast.success(response.data.message);
  setloading(false)
   }else{
  toast.error(response.data.message);
  setloading(false)
   }
  }


  // async function addTowishlist(e,id){
  //   let response = await addProductTowishlist(id)
  //   console.log(response.data)
  //   if(response.data.status=='success'){
  //    setnumberWishlist(numberWishlist + 1)
  //    e.target.classList.replace('fa-regular','fa-solid')
  //    toast.success(response.data.message);
    
  //     }else{
  //      toast.error(response.data.message)}
  //  }

    function getProduct(id){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        .then((res)=>{
          setproduct(res.data.data)
        })
        .catch((res)=>{
           console.log(res)
        })
    }
    function getAllProducts(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        .then((res)=>{
          console.log(res)
    let related = res.data.data.filter((product)=>product.category.name == category)
    setrelatedProducts(related)
        })
        .catch((err)=>err)
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
    


    useEffect(()=>{
        getProduct(id);
        getAllProducts()
    },[id,category])



  return <>

<div>
<Helmet>
                <meta charSet="utf-8" />
                <title>{product?.title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

</div>

   <div className="row my-12 items-center">
  <div className='w-full md:w-1/4'>
  <Slider {...settings}>
  {product?.images.map((src)=> <img key={src._id} src={src} className='w-full' alt=''/>)}
  </Slider>
 
  </div>
   <div className='w-3/4 p-4 text-left'>
  <h3 className='font-semibold capitalize text-2xl'>{product?.title}</h3>
  <h4 className='text-gray-700 my-4'>{product?.description}</h4>
  <h4 className='font-bold'>{product?.category.name}</h4>
  <div className='flex justify-between p-3 my-5'>
  <div className='flex items-center '>
        <span className={product?.priceAfterDiscount? 'line-through text-red-600 ':''}>{product?.price} </span>
        <span className='ml-1'>{product?.priceAfterDiscount}EGP</span>
        </div>
        <span><i className='fas fa-star text-yellow-400'></i>{product?.ratingsAverage}</span>
    </div>
    <button className='btn' onClick={()=>addTocart(product.id)}>
      {loading && currentId == product.id? <i className='fas fa-spinner fa-spin'></i>:'Add To Cart'}
      </button>

  

</div> 








 </div>


 <div className="row my-5">
 {relatedProducts.length > 0 ? relatedProducts.map((product)=>(
 <div key={product.id} className='w-full md:w-1/4 lg:w-1/6'> 
  <div className="product my-2 p-2 relative">
  <Link to={`/productdetails/${product.id}/${product.category.name}`}>
    <img src={product?.imageCover} alt={product.title} className='w-full'/>
    <h3 className='text-emerald-600'>{product.category.name}</h3>
    <h3 className='font-semibold mb-1'>{product.title.split(' ').slice(0,2).join('')}</h3>
    <div className='flex justify-between p-3'>
    <div className='flex items-center'>
        <span className={product?.priceAfterDiscount? 'line-through text-red-600 ':''}>{product?.price} </span>
        <span>{product?.priceAfterDiscount}EGP</span>
        </div>
        <span><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage}</span>
    </div>
    </Link>
    <span>
    <i  className={`${isInWishlist.has(product.id)?'fa-solid text-red-600':'fa-regular text-black hover:text-red-600'} fa-heart fa-2x absolute m-4 btt `} onClick={()=>addTowishlist(product.id)}></i>
    </span>
    <button className='btn' onClick={()=>addTocart(product.id)}>
      {loading && currentId == product.id? <i className='fas fa-spinner fa-spin'></i>:'Add To Cart'}
      </button>
</div>
</div>)):<div className="spinner"></div>}
 </div> 



  
  </>
  
}
