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
    <Stack>
        <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
        <Stack.Screen name='Welcome Options' options={{title:"welcome"}}/>
    </Stack>
    
)
}

export default AppLayout