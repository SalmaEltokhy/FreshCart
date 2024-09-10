import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Notfount from './components/Notfound/Notfount'
import Cart from './components/Cart/Cart'
import Brands from './components/Brands/Brands'
import Products from './components/Products/Products'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import  { Toaster } from 'react-hot-toast';
import CartContextprovider from './Context/CartContex'
import Checkout from './components/Checkout/Checkout'
import Wishlist from './components/Wishlist/Wishlist'
import WishlistContexProvider from './Context/WishlistContex'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import ResetCode from './components/ResetCode/ResetCode'
import ResetPassword from './components/ResetPassword/ResetPassword'
import AllOrders from './components/ALLOrders/AllOrders'
import Categories from './components/Categories/Categories'


let query =new QueryClient()




let x= createBrowserRouter([
{path:'' , element: <Layout/> , children :[
  {index: true, element :<ProtectedRoute><Home/></ProtectedRoute> },
  {path:'cart', element : <ProtectedRoute><Cart/></ProtectedRoute>},
  {path:'products', element :<ProtectedRoute><Products/></ProtectedRoute> },
  {path:'categories', element :<ProtectedRoute><Categories/></ProtectedRoute> },
  {path:'checkout', element :<ProtectedRoute><Checkout/></ProtectedRoute> },
  {path:'productdetails/:id/:category', element :<ProtectedRoute><ProductDetails/></ProtectedRoute> },
  {path:'brands', element :<ProtectedRoute><Brands/></ProtectedRoute> },
  {path:'allorders', element :<ProtectedRoute><AllOrders/></ProtectedRoute> },
  {path:'wishlist', element :<ProtectedRoute><Wishlist/></ProtectedRoute> },
    {path:'register', element : <Register/>},
    {path:'login', element : <Login/>},
    {path:'forgetpassword', element : <ForgetPassword/>},
    {path:'resetcode', element : <ResetCode/>},
    {path:'resetpassword', element : <ResetPassword/>},
  ]},
  {path:'*', element : <Notfount/>},

])



function App() {

  return (
    <>
    <UserContextProvider>

    <QueryClientProvider client={query}>
<CartContextprovider>
  <WishlistContexProvider>
  <RouterProvider router={x}></RouterProvider>
  <Toaster />
  </WishlistContexProvider>

</CartContextprovider>
    <ReactQueryDevtools/>
    
    </QueryClientProvider>

    </UserContextProvider>
 
    </>
  )
}

export default App
