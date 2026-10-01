import { View, Text, StyleSheet, Button, Pressable } from 'react-native'
import React from 'react'
import { useLocalSearchParams, router } from 'expo-router'

import { useAuth } from '@/src/context/AuthContext'

const Welcome = () => {

    const {username}=useLocalSearchParams<{username:string}>()

    const{logout} = useAuth()

    const handleLogout = async ()=>{
      await logout();
    }

  return (
    <View>
      <Text>welcome , {username}</Text>

      <Text>you have succesfully logined in</Text>

      <Button title="Logout" onPress={handleLogout}/>

      <Pressable onPress={()=>{
        router.push({
          pathname:"/student"
        })
      }}>
        <Text> View Students</Text>
      </Pressable>


    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:20,
  }
})