import { View, Text } from 'react-native'
import {Tabs} from 'expo-router'

import Ionicons from '@expo/vector-icons/Ionicons'

import React from 'react'

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown:false}}>

      <Tabs.Screen name='index' options={{
        title:"Home", 
        tabBarIcon:({color, size}) =>(
          <Ionicons name="home-outline" size={24} color="#0000FF"  />
        )
      }}/>

      <Tabs.Screen name='student' options={{
        title:"Students", 
        tabBarIcon:({color, size}) =>(
          <Ionicons name="people-outline" size={24} color="#0000FF"  />
        )
      }}/>

      <Tabs.Screen name='profile' options={{
        title:"Profile", 
        tabBarIcon:({color, size}) =>(
          <Ionicons name="person-outline" size={24} color="#0000FF"  />
        )
      }}/>

      <Tabs.Screen name='settings' options={{
        title:"Settings", 
        tabBarIcon:({color, size}) =>(
          <Ionicons name="settings-outline" size={24} color="#0000FF"  />
        )
      }}/>

    </Tabs>

)
}

export default TabsLayout