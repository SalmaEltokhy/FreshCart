import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import logo from '../../assets/freshcart-logo.svg'
import { CartContext } from '../../Context/CartContex'
import { WishlistContex } from '../../Context/WishlistContex'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Navbar() {
  let {userLogin,setuserLogin}=useContext(UserContext)
  let{numberItems,getLoggedUserCart}=useContext(CartContext)
  let{getLoggedUserWishlist}=useContext(WishlistContex)
  let navigate=useNavigate()
const [open, setOpen] = useState(false)

  function signout(){
    localStorage.removeItem('userToken');
    setuserLogin(null)
    navigate('/login')



  }
function toggle(){
  setOpen(!open)


}

function getCart(){
  getLoggedUserCart()
}

function getWishlist(){
  getLoggedUserWishlist()
}
useEffect(()=>{
  getCart()
  getWishlist()
},[])

  return <>

<nav className="border-gray-200 fixed top-0 right-0 left-0 bg-slate-200 z-50">
    <div className="md:flex flex-wrap justify-center md:justify-between items-center mx-auto max-w-screen-xl p-4 relative">
      <div className='md:flex items-center gap-5'>
      <Link to="" className="md:flex items-center space-x-3 rtl:space-x-reverse">  
      <img src={logo} alt="freshcart logo" width='130px' className='h-8'/>
        </Link>

        {userLogin!= null?<>
          <ul className={`md:flex gap-4 ${open?'block':'hidden'} text-left`}>
              <li className='py-1'><NavLink to="" className=' text-gray-700'>Home</NavLink></li>
              <li className='py-1'><NavLink to="cart" className='relative text-gray-700'>Cart
                
              {/* {numberItems==0?'': <div className='absolute top-[-15px] p-3 right-[-15px] size-5 bg-emerald-600 text-white rounded-full flex items-center justify-center'>
                  {numberItems}
                  </div>} */}
            
            
                
               
                </NavLink></li>
                <li className='py-1'><NavLink to="wishlist" className=' text-gray-700'>WishList</NavLink></li>

              <li className='py-1'><NavLink to="products" className=' text-gray-700'>Products</NavLink></li>
              <li className='py-1'><NavLink to="categories" className=' text-gray-700'>Categories</NavLink></li>
              <li className='py-1'><NavLink to="brands" className=' text-gray-700'>Brands</NavLink></li>
            </ul>
        </>:null}
       
      </div>
       
        <div className={`md:flex items-center space-x-6 rtl:space-x-reverse ${open?'block':'hidden'}`}>
        <div className="icons flex gap-4 items-center py-3">
        <Link to='https://www.facebook.com/'><i className='fab fa-facebook'></i></Link>  
        <Link to='https://www.linkedin.com/'><i className='fab fa-linkedin'></i></Link>  
       <Link to='https://www.youtube.com/#!;'><i className='fab fa-youtube'></i></Link>   
        <Link to='https://www.tiktok.com/explore'><i className='fab fa-tiktok'></i></Link>  
       <Link to='https://x.com/'><i className='fab fa-twitter'></i></Link>   
         </div>
         {userLogin!= null?<>
          <i className="fa-solid fa-cart-shopping text-emerald-600 fa-xl relative">
          {numberItems==0?'': <div className='absolute top-[-5px] right-[9px] size-1 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm'>
                  {numberItems}
                  </div>}
          </i>

           
          </>  :null}
          <div className="links md:flex gap-4 py-2">

         
            {userLogin!=null? <span className="text-sm cursor-pointer" onClick={signout}> <i className="fa-solid fa-right-to-bracket fa-xl text-emerald-600"></i> SignOut</span>:
            <>
            <p><NavLink to="login" className="text-sm">Login</NavLink></p>  
            <p><NavLink to="register" className="text-sm">Register</NavLink></p>  
            </>
            }
        
           
          </div>
          
            
        </div>
        <div className='block md:hidden'>
        <i onClick={toggle} className={`fa-solid ${!open?'fa-bars':'fa-close'} fa-2x absolute top-4 right-2 cursor-pointer`}></i>

        </div>
    </div>
</nav>

    
   
    
    
    </>
  
}
