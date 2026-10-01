import { View, Text } from 'react-native'
import {createContext,useContext,useEffect,useState,ReactNode} from 'react'
import { loginUser } from '../features/auth/authApi'

import { saveToken, getAccessToken, getRefreshToken, deleteTokens } from '../services/tokenServices'

// create context =create a shared context that share can store data and make it available to multiple component


// use context =reads and access a value from coontext

// react node - describe anything that react can render as a child


interface AuthContextProps {
    isLoggedIn:boolean;
    loading:boolean;
    login:()=>void;
    logout:()=>Promise<void>
}

const AuthContext =createContext<AuthContextProps|undefined>(undefined)

interface AuthProviderProps {
    children:ReactNode
}

export const AuthContextProvider = ({children,}:AuthProviderProps) => {

    const [isLoggedIn,setIsLogeedIn] =useState(false)
    const [loading,setLoading] =useState(true)

    useEffect(()=>{
        checkAuthentication()
    },[])

    const checkAuthentication=async ()=>{
        try{
            const accessToken =await getAccessToken()
            const refreshToken=await getRefreshToken()

            if(accessToken||refreshToken){
                setIsLogeedIn(true)
            }
            else{
                setIsLogeedIn(false)
            }
        }catch(error){
            console.log("Authentication check failed ",error)
        }
        finally{
            setLoading(false)
        }
    }


    const login =()=>{
        setIsLogeedIn(true)
    }


    const logout =async ()=>{
        try{
            await deleteTokens()
            setIsLogeedIn(false)
        }
        catch(error){
            console.log("Logout failed ",error)
        }
    }
  return (
   <AuthContext.Provider value={{isLoggedIn,loading,login,logout}}>


    {children}
   </AuthContext.Provider>
  )
}

export const useAuth =()=>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within AuthContextProvider")
    }
    return context;
}