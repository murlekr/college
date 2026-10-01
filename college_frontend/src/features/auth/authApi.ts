import { apiClient } from "../../services/client";
import { saveToken } from "../../services/tokenServices";
import { RegisterData, RegisterResponse,LoginData, LoginResponse, LoginUser } from "./auth";


export const registerUser = async(data:RegisterData):Promise<RegisterResponse> =>{
    const response = await apiClient.post<RegisterResponse>("/api/auth/register/", data)
    return response.data
}

export const loginUser = async(data:LoginData):Promise<LoginResponse>=>{
    const response = await apiClient.post<LoginResponse>("/api/auth/login/", data)

    const {access, refresh} = response.data
    await saveToken(access, refresh)

    return response.data
}

export const refreshAccessToken = async(refreshToken:string):Promise<string>=>{
    const response = await apiClient.post<{access:string}>("/api/auth/token/refresh/", {refresh:refreshToken})
    const newAccessToken = response.data.access
    return newAccessToken
}

