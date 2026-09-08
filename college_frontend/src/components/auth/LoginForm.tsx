import { View, Text } from 'react-native'
import React from 'react'

import AppButton from '../common/AppButton';
import AppInput from '../common/AppInput';

import { LoginFormData } from '@/src/types/auth';

interface LoginFormProps {
    formData:LoginFormData;
    onChange:(field:keyof LoginFormData,value:string)=>void
    loading:boolean;
    onSubmit:()=>void
}


const LoginForm = ({formData, onChange, loading, onSubmit}:LoginFormProps) => {
  return (
    <View>
      <AppInput placeholder="Username" value={formData.username} onChangeText={(text)=>onChange("username",text)}/>
      <AppInput placeholder="Password" value={formData.password} onChangeText={(text)=>onChange("password",text)} secureTextEntry/>
        
      <AppButton title="Login" loading={loading} variant="primary" onPress={onSubmit}/>
    </View>
  )
}

export default LoginForm