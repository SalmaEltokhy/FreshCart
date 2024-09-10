import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProducts() {
  
    function getProducts(){
        return  axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      }
      
       let productInfo = useQuery({
              queryKey:['recentProduct'],
              queryFn : getProducts,
               staleTime:7000, 
              // gcTime:4000,
              // retry:7,
              // retryDelay:3000,
             // refetchInterval: 2000,
              //refetchIntervalInBackground: true,
             // refetchOnWindowFocus: true,
      
      
          });

return productInfo

}
