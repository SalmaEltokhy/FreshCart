import React from 'react'
import Navbar from '../Navbar/Navbar'

import { Outlet } from 'react-router-dom'
import { Offline } from "react-detect-offline";

export default function Layout() {
  return (<>
  <Navbar/>
<div className='container py-10 mx-auto w-[80%]'>
<Outlet/>
</div>
<div className='border shadow-md fixed left-2 bottom-2 text-red-600 text-xl font-semibold p-4'>

<Offline>please coneect network</Offline>
</div>

  </>
   
  )
}
