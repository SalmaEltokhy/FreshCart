import React from 'react'
import erro from '../../assets/error.svg'
import {Helmet} from "react-helmet";



export default function Notfount() {
  return <>
  <div>
<Helmet>
                <meta charSet="utf-8" />
                <title>NotFount</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

</div>
    <div className='flex items-center justify-center pt-10'>
<img src={erro} alt=""className='w-full' />
    </div>
  
  </>
  
  
}
