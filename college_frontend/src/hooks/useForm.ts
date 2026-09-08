import { View, Text } from 'react-native'
import React from 'react'
import {useState} from 'react'

const useForm = <T extends object> (initialValues:T) => {
    const [formData, setFormData] = useState<T>(initialValues);

    const handleChange = (field:keyof T, value:string)=>{
        setFormData((prev)=>({
            ...prev,
            [field]:value,
        }))
    }

    const resetForm = () => {
        setFormData(initialValues);
    }

    return {
        formData,
        handleChange,
        resetForm
    }

}


export default useForm