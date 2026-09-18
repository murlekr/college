import { View, Text } from 'react-native'
import React from 'react'

import { Stack, Redirect } from 'expo-router'
import {useAuth} from '@/src/context/AuthContext'

const AppLayout = () => {

    const {isLoggedIn, loading} = useAuth()


    if(loading){
        return null;
}

if(!isLoggedIn){
    return <Redirect href="/login"/>
}

return (
    <Stack screenOptions={{headerShown:false}}/>
)
}

export default AppLayout