import axios from "axios";
import { useState } from "react";
import { createContext } from "react";

  export let WishlistContex=createContext();

  export default function WishlistContexProvider(props){

    let headers={
        token:localStorage.getItem('userToken')
    }


    function addProductTowishlist(productId){
        return axios
        .post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:productId,},{headers,})
    .then((res) => res)
    .catch((err)=>err)
    }

    function getLoggedUserWishlist(){
        return axios
        .get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers,})
        .then((res)=>res)
        .catch((err)=>err)
    }

    function deleteItemWishlist(producId){
        return axios
        .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${producId}`,{headers,})
        .then((res)=>res)
        .catch((err)=>err)
    }



    return<WishlistContex.Provider value={{deleteItemWishlist,addProductTowishlist,getLoggedUserWishlist
    }}>
        {props.children}
    </WishlistContex.Provider>
  }