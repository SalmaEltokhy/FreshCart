import React from 'react'
import RecentProducts from ".././RecentProducts/RecentProducts";
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';
import {Helmet} from "react-helmet";



export default function Home() {


  return (<>

<div>
<Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

</div>

  <MainSlider/>
  <CategoriesSlider/>
  <RecentProducts/>
  
  </>
   
  )
}

