import axios from "axios"
import { ENV } from "../config/environment"

import type { InternalAxiosRequestConfig } from "axios"
import { getAccessToken, saveToken, deleteTokens } from "./tokenServices"

export const apiClient = axios.create({
  baseURL:ENV.API_BASE_URL,
  timeout:10000,
  headers:{
    "Content-Type":"application/json"
  }  
})