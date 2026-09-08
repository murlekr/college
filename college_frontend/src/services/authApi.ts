import { apiClient } from "./client";

export interface RegisterData{
    username:string,
    email:string,
    password:string,
    password2:string,
}

export interface RegisterResponse{
    id:number,
    username:string,
    email:string,
}

export const registerUser = async(data:RegisterData):Promise<RegisterResponse> =>{
    const response = await apiClient.post<RegisterResponse>("/api/auth/register/", data)
    return response.data
}

export interface LoginData{
    username:string;
    password:string;
}

export interface LoginUser{
    id:number;
    username:string;
    email:string;
}

export interface LoginResponse{
    refresh:string;
    access:string;
    user:LoginUser;
}

export const loginUser = async(data:LoginData):Promise<LoginResponse>=>{
    const response = await apiClient.post<LoginResponse>("/api/auth/login/", data)
    return response.data
}