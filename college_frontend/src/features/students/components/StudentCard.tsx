import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

import { Student } from '../studentTypes'

import { router } from 'expo-router'
interface StudentCardProps {
    student: Student
}


const StudentCard = ({student}:StudentCardProps) => {

  return (
    <Pressable onPress={()=>router.push({
        pathname:"/student/[id]", 
        params:{id:student.id}
    })}>
    <View style={styles.card}>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.text}>{student.email}</Text>
        <Text style={styles.text}>{student.phone}</Text>
        <Text style={styles.text}>{student.department}</Text>
        <Text style={styles.text}>{student.year}</Text>
        </View>
    </Pressable>
  )
}

export default StudentCard


const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    name: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    text: {
        fontSize: 12,
        marginBottom: 4,
    }
})