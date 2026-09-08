import { Alert, View, Text, TextInput, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import {router, Router} from 'expo-router'
import { LoginData, loginUser, LoginUser } from '@/src/services/authApi'
import { LoginFormData } from '@/src/types/auth'
import LoginForm from '@/src/components/auth/LoginForm'
import useForm from '@/src/hooks/useForm'

const LoginScreen = () => {

  const{formData, handleChange, resetForm} = useForm<LoginFormData>({
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async()=>{
    const {username, password} = formData;
    if(!username || !password){
      Alert.alert("Error", "Please enter all the fields");
      return;
    }
    const data:LoginData={
      username,
      password
    }
    try{
      setLoading(true)
      const response = await loginUser(data)
      console.log ("login Successful", response)
      Alert.alert("Success", `Welcome ${response.user.username}`)
      resetForm()
      router.replace({
      pathname:"/welcome",
      params:{
        username:response.user.username
             }
            })
      
    }  catch(error:any){
      console.log("Login Error:", error)

      if(error.response){
        console.log("Backend Response:", error.response.data)
        Alert.alert("Login Failed", JSON.stringify(error.response.data))
      }
      else{
        Alert.alert("login Failed:", "Unable to connect to the server")
      }
    } finally{
      setLoading(false)
    }
}
return (
  <View style={styles.container}>
    <Text style={styles.title}>Login</Text>
    <LoginForm formData={formData} onChange={handleChange} loading={loading} onSubmit={handleLogin} />
    
  </View>
)
}


export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});