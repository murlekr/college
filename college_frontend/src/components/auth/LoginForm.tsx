import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

import AppButton from '../common/AppButton';
import AppInput from '../common/AppInput';

import { LoginFormData } from '@/src/types/auth';

interface LoginFormProps {
    formData:LoginFormData;
    onChange:(field:keyof LoginFormData,value:string)=>void
    loading:boolean;
    onSubmit:()=>void
    onSignup:()=>void
}


const LoginForm = ({formData, onChange, loading, onSubmit, onSignup}:LoginFormProps) => {
  return (
    <View>
      <AppInput placeholder="Username" value={formData.username} onChangeText={(text)=>onChange("username",text)}/>
      <AppInput placeholder="Password" value={formData.password} onChangeText={(text)=>onChange("password",text)} secureTextEntry/>
        
      <AppButton title="Login" loading={loading} variant="primary" onPress={onSubmit}/>

      <Pressable style={styles.loginLink} onPress={onSignup}>
          <Text style={styles.loginLinkText}>Create a new Account:{""}</Text>
          <Text style={styles.linkText}>Sign Up</Text>
      </Pressable>

    </View>
  )
}

export default LoginForm

const styles = StyleSheet.create({
  loginLink:{
    marginTop:20,
    alignItems:"center",
  },
  loginLinkText:{
    fontSize:14,
  },
  linkText:{
    fontWeight:"bold",
    color:"blue",
  }
}
)