import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

export default function CategoriesSlider() {
const [categories, setcategories] = useState([])

var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay:true,
    autoplaySpeed:2000,
  };
    function getCategories(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        .then((res)=>{
            setcategories(res?.data?.data)
           
            
        })
        .catch((res)=>{})
    }
    useEffect(()=>{
        getCategories()
    },[])
  return <>
  <h2 className='text-gray-600 font-semibold my-4 capitalize text-left'>shop popular categories</h2>

    <Slider {...settings}>
{categories.map((category)=> <div key={category?._id}>
    <img src={category?.image} alt="" className='w-full h-[200px] object-cover'/>
    <h4>{category?.name}</h4>
</div>)}

    </Slider>
  
  
  
  </>
}
