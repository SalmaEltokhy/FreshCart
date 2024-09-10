import React from 'react'
import Slider from "react-slick";
import imag1 from '../../assets/imag1.jpg'
import imag2 from '../../assets/imag2.jpg'
import imag3 from '../../assets/imag3.jpg'
import imag4 from '../../assets/imag4.jpg'
import imag5 from '../../assets/imag5.jpg'
import imag6 from '../../assets/imag6.jpg'
import imag7 from '../../assets/imag7.jpg'

export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2000,
      };
  return <>
  <div className="row my-5">
    <div className="w-full md:w-3/4">
    <Slider {...settings}>
    <img src={imag1} alt="" className='w-full h-[400px]  object-fill mb:object-cover'/>
    <img src={imag4} alt="" className='w-full h-[400px]  mb:object-cover object-fill'/>
    <img src={imag5} alt="" className='w-full h-[400px]  mb:object-cover object-fill'/>
    <img src={imag6} alt="" className='w-full h-[400px]  mb:object-cover object-fill'/>
    <img src={imag7} alt="" className='w-full h-[400px] mb:object-cover object-fill'/>
    </Slider>
  
    
    </div>
    <div className="w-full md:w-1/4 mt-7 md:mt-0">
    <img src={imag2} alt="" className='w-full h-[200px]'/>
    <img src={imag3} alt="" className='w-full h-[200px]' />
    </div>
  </div>
   
  </>
}
