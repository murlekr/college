import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

import {useAuth} from '@/src/context/AuthContext'

const Index = () => {
  const {isLoggedIn, loading} = useAuth()

  if(loading){
    return null;
  }

  if(isLoggedIn){
    return (
      <Redirect href = "/(app)/(tabs)"/>
    )
  }

  return (
    <Redirect href = "/login"/>
  )
}

export default Index