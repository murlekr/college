import { View, Text, Pressable, StyleSheet, PressableProps, ActivityIndicator } from 'react-native'
import React from 'react'

interface AppButtonProps extends PressableProps{
    title:string;
    loading:boolean;
    variant?: "primary"|"danger"|"secondary"

} 

const AppButton = ({title, loading=false,variant="primary", ...props}:AppButtonProps) => {
  return (
    <Pressable 
        style={[styles.button, styles[variant]]} 
        disabled={loading}
        {...props}
    >
     {loading ? (
        <ActivityIndicator color="#fff"/>
     ):(
        <Text style={styles.buttonText} > 
            {title} 
        </Text>
     )}   
    </Pressable>
  )
}

export default AppButton

const styles = StyleSheet.create({

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

primary:{
    backgroundColor:"blue"
},
secondary:{
    backgroundColor:"green"
},
danger:{
    backgroundColor:"red"
}

})