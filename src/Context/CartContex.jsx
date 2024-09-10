import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext=createContext();

export default function CartContextprovider(props){
let headers={
    token:localStorage.getItem('userToken')
}
const [CartId, setCartId] = useState(0)

const [numberItems, setnumberItems] = useState(0)

function getLoggedUserCart(){
    return axios
    .get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers,})
    .then((res)=>{
       
        setnumberItems(res?.data?.numOfCartItems)
      setCartId(res?.data?.data?._id)
        return res
    })
    .catch((err)=>err)
}


function addProductTocard(productId){
    return axios
    .post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId:productId},{headers,})
.then((res) =>res )
.catch((err)=>err)
}



function updateCartProductQuantity(productId , newCount){
    return axios
    .put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:newCount},{headers,})
    .then((res)=>res)
    .catch((err)=>err)
}


function clearUserCart(){
    return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers,})
    .then((res)=>res)
    .catch((err)=>err)
}

function deleteCartItem(productId){
    return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers,})
    .then((res)=>res)
    .catch((err)=>err)
}

function checkout(catId, url ,formData){
    return axios
    .post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${catId}?url=${url}`,{shippingAddress:formData},{headers,} )
    .then((res) => res)
    .catch((err)=>err)
    
  
}



useEffect(()=>{
    getLoggedUserCart()
},[])


    return <CartContext.Provider value={{clearUserCart,deleteCartItem,updateCartProductQuantity
    ,getLoggedUserCart,addProductTocard,checkout,CartId ,setnumberItems,numberItems}}>
        {props.children}
    </CartContext.Provider>

}