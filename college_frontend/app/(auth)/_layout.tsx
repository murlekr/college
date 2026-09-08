import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export const unstable_settings = {
    initialRouteName:"login"
}


const Authlayout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}/>
  )
}

export default Authlayout