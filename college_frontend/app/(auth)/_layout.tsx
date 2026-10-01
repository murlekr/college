import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Authlayout = () => {
  return (
    <Stack initialRouteName="login" screenOptions={{headerShown:false}}/>
  )
}

export default Authlayout