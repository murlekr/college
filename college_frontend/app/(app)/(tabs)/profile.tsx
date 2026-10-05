import { View, Text,Alert } from 'react-native'
import React from 'react'
import { useAuth } from '@/src/context/AuthContext'
import { Router,router } from 'expo-router'

import AppButton from '@/src/components/common/AppButton'



const ProfileScreen = () => {

    const {logout}=useAuth()

    const handleLogout =()=>{

    Alert.alert("Logout",
        "Are you sure you want to logout?",
        [{
            text:"Cancel"
        },
    {text:"Logout",
        onPress:handleLogoutConfirm,
    }]
    )

    }



    const handleLogoutConfirm =async ()=>{
        try{
            await logout()
            router.replace("/login")
        }
        catch(error){
            console.log("Logout failed",error)
            Alert.alert("Failed to logout please try again")
        }
    }
  return (
    <View>
      <Text>Profile</Text>
      <Text>User profile will appear here </Text>
      <AppButton title='Logout' variant='danger'onPress={handleLogout}/>
    </View>
  )
}

export default ProfileScreen