import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Welcome = () => {

    const {username}=useLocalSearchParams<{username:string}>()


  return (
    <View>
      <Text>welcome , {username}</Text>

      <Text>you have succesfully logined in</Text>
    </View>
  )
}

export default Welcome