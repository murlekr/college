import {apiClient } from "@/src/services/client"
import {CreateStudentData, Student} from "./studentTypes"

export const getStudents = async():Promise<Student[]>=>{
    const response = await apiClient.get("/api/students/");
    return response.data
}

export const createStudent = async(data:CreateStudentData):Promise<Student>=>{
    const response = await apiClient.post<Student>("/api/students/",data );
    return response.data
}

export const getStudent = async(id:number):Promise<Student>=>{
    const response = await apiClient.get<Student>(`/api/students/${id}/`)
    return response.data
}

export const updateStudent = async(id:number, data:CreateStudentData):Promise<Student>=>{
    const response = await apiClient.put<Student>(`/api/students/${id}/`, data)
    return response.data
}

export const deleteStudent = async(id:number):Promise<void>=>{
    await apiClient.delete<Student>(`/api/students/${id}/`)
}