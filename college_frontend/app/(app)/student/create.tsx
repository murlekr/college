import { View, Text, Alert, StyleSheet } from 'react-native'
import React from 'react'

import StudentForm from '@/src/features/students/components/StudentForm'
import { CreateStudentData } from '@/src/features/students/studentTypes'
import { createStudent } from '@/src/features/students/studentApi'
import useForm from '@/src/hooks/useForm'
import { router } from 'expo-router'

import { MIN_STUDENT_YEAR, MAX_STUDENT_YEAR } from '@/src/constants/student'

const CreateStudentScreen = () => {

    const {
        formData, 
        handleChange,
    } = useForm<CreateStudentData>({
            name:"",
            email:"",
            phone:"",
            department:"",
            year:1,
        })

        const year = Number(formData.year)
        if (year<MIN_STUDENT_YEAR || year > MAX_STUDENT_YEAR){
            Alert.alert(`Year mulst be between ${MIN_STUDENT_YEAR} and ${MAX_STUDENT_YEAR} `)
        }

    const handleSubmit=async ()=>{
        if(!formData.name||!formData.email||!formData.phone||!formData.department){
            Alert.alert("Please fill all the fields");
            return;
        }

        try{
            const studentData: CreateStudentData={
                ...formData,
                year
            }

            const Student = await createStudent(studentData)

            console.log("Student Created", Student)
            router.replace("/student")
        }
        catch(error){
            console.log("failed to cteate student", error)
        }
    }

  return (
     <View style={styles.container}>
          <Text style={styles.title}>Create Student</Text>

          <StudentForm 
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={false}
            />
    </View>
  )
}

export default CreateStudentScreen

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