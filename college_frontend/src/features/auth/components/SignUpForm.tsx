import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

import AppButton from '../../../components/common/AppButton';
import AppInput from '../../../components/common/AppInput';

// import { SigupFormData } from '@/src/types/auth';

import {SignupFormData} from "@/src/features/auth/auth";


interface SigupFormProps {

    formData:SignupFormData;
    onChange:(field:keyof SignupFormData,value:string)=>void

    loading:boolean;
    onSubmit:()=>void;
    onLogin:()=>void;

}

const SigupForm = ({formData,onChange,loading,onSubmit,onLogin}:SigupFormProps) => {
  return (
    <View>
      
       <AppInput placeholder="Username" value={formData.username} onChangeText={(text)=>onChange("username",text)}/>
      <AppInput placeholder="Email" value={formData.email} onChangeText={(text)=>onChange("email",text)}/>
      <AppInput placeholder="Password" value={formData.password} onChangeText={(text)=>onChange("password",text)} secureTextEntry/>
      <AppInput placeholder="Confirm Password" value={formData.password2} onChangeText={(text)=>onChange("password2",text)} secureTextEntry/>
         <AppButton title="sigup" loading={loading} variant="danger" onPress={onSubmit}/>

         <Pressable style={styles.loginLink} onPress={onLogin}>
          <Text style={styles.loginLinkText}>Already have an account?:{""}</Text>
          <Text style={styles.linkText}>Login</Text>
        </Pressable>
    </View>
  )
}

export default SigupForm

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