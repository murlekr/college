import {TextInputProps, TextInput, StyleSheet } from 'react-native'
import React from 'react'

interface AppInputProps extends TextInputProps {
    value:string;
    onChangeText:(text:string)=>void
}


const AppInput = ({value, onChangeText, ...props}:AppInputProps) => {
  return (
      <TextInput style={styles.input} value={value} onChangeText={onChangeText} {...props}/>
  )
}

export default AppInput

const styles = StyleSheet.create ({
    input: {
        borderWidth: 1, 
        borderColor: "#ccc", 
        borderRadius:8, 
        padding:12,
        marginBottom:15,
    }
})