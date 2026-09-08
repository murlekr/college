import axios from "axios"
import { ENV } from "../config/environment"

import type { InternalAxiosRequestConfig } from "axios"
import { getAccessToken, saveToken, deleteTokens, getRefreshToken } from "./tokenServices"

interface RetryableRequestConfig extends InternalAxiosRequestConfig{
  _retry?: boolean
}

export const apiClient = axios.create({
  baseURL:ENV.API_BASE_URL,
  timeout:10000,
  headers:{
    "Content-Type":"application/json"
  }  
})

const refreshClient = axios.create({
  baseURL:ENV.API_BASE_URL,
  timeout:10000,
  headers:{
    "Content-Type":"application/json"
  }
})

apiClient.interceptors.request.use(
  async(config) => {
    const accessToken = await getAccessToken()
    if(accessToken){
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  }
)
apiClient.interceptors.response.use(
  (response) =>{
    return response
  },
  async(error) =>{
    const originalRequest = 
    error.config as RetryableRequestConfig;
    
    if(error.response.status === 401 && !originalRequest._retry){
      originalRequest._retry = true
    }
    try{
      const refreshToken = await getRefreshToken()
      if(!refreshToken){
        await deleteTokens()
        return Promise.reject(error)
      }
      const response = await refreshClient.post("api/auth/token/refresh/", 
        {
          refresh: refreshToken
        });
        const newAccessToken = response.data.access
        const newRefreshToken = response.data.refresh ?? refreshToken;
        await saveToken(
          newAccessToken, 
          newRefreshToken
        );
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return apiClient(originalRequest);
      } catch(refreshError){
        await deleteTokens()
        return Promise.reject(
          refreshError

        );
      }
      return Promise.reject(error);
    }   
);

// apiClient.interceptors.request.use(async (config:InternalAxiosRequestConfig)=>{
//   const accessToken = await getAccessToken()
//   if(accessToken){
//     config.headers.Authorization = `Bearer ${accessToken}`
//   } 
//   return config
// }, (error)=>{
//   return Promise.reject(error)
// } )

// apiClient.interceptors.response.use((response)=>{
//   return response
// }, async (error)=>{
//   const originalRequest = error.config
//   if(error.response.status === 401 && !originalRequest._retry){
//     originalRequest._retry = true
//     try{{
//       const refreshToken = await getRefreshToken()
//       if(!refreshToken){
//         deleteTokens()
//         return Promise.reject(error)
//       }
//       const response = await refreshClient.post("/auth/refresh", {refreshToken})
//       const {accessToken, refreshToken:newRefreshToken} = response.data
//       saveToken(accessToken, newRefreshToken)
//       originalRequest.headers.Authorization = `Bearer ${accessToken}`
//       return apiClient(originalRequest)
//     }catch(err){
//       deleteTokens()
//       return Promise.reject(err)
//     }
//   }
//   return Promise.reject(error)
// })
