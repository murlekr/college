import { View, Text } from 'react-native'
import React from 'react'

import AppButton from '../common/AppButton';
import AppInput from '../common/AppInput';

// import { SigupFormData } from '@/src/types/auth';

import {SignupFormData} from "@/src/types/auth";


interface SigupFormProps {

    formData:SignupFormData;
    onChange:(field:keyof SignupFormData,value:string)=>void

    loading:boolean;
    onSubmit:()=>void

}

const SigupForm = ({formData,onChange,loading,onSubmit}:SigupFormProps) => {
  return (
    <View>
      
       <AppInput placeholder="Username" value={formData.username} onChangeText={(text)=>onChange("username",text)}/>
      <AppInput placeholder="Email" value={formData.email} onChangeText={(text)=>onChange("email",text)}/>
      <AppInput placeholder="Password" value={formData.password} onChangeText={(text)=>onChange("password",text)} secureTextEntry/>
      <AppInput placeholder="Confirm Password" value={formData.password2} onChangeText={(text)=>onChange("password2",text)} secureTextEntry/>
         <AppButton title="sigup" loading={loading} variant="danger" onPress={onSubmit}/>
    </View>
  )
}

export default SigupForm