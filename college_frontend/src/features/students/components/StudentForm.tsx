// import { View, Text } from 'react-native'
// import React from 'react'
// import AppButton from '@/src/components/common/AppButton'
// import AppInput from '@/src/components/common/AppInput'

// import { CreateStudentData } from '../studentTypes'

// interface StudentFormProps {
//     formData:CreateStudentData;
//     onChange:(
//         field:keyof CreateStudentData, 
//         value:string)=>void

//     onSubmit:()=>void
//     loading:boolean;
//     buttonTitle?:string
// }  


// const StudentForm = ({formData, onChange, onSubmit, loading, buttonTitle="Create Student"}:StudentFormProps) => {
//   return (
//     <View>
//         <AppInput placeholder='Name' value={formData.name} onChangeText={(text)=>onChange("name", text)}/>
//         <AppInput placeholder='Email' keyboardType='email-address' autoCapitalize='none' value={formData.email}  onChangeText={(text)=>onChange("email", text)}/>
//         <AppInput placeholder='Phone' keyboardType='phone-pad' value={formData.phone} onChangeText={(text)=>onChange("phone", text)}/>
//         <AppInput placeholder='Department' value={formData.department} onChangeText={(text)=>onChange("department", text)}/>
//         <AppInput placeholder='Year' value={formData.year.toString()} onChangeText={(text)=>onChange("year", text)}/>
    
//         <AppButton title={buttonTitle} onPress={onSubmit} loading={loading}/>
        

//     </View>
//   )
// }

// export default StudentForm

import {
  View,
} from "react-native";

import AppButton from "@/src/components/common/AppButton";
import AppInput from "@/src/components/common/AppInput";

// import AppButton from "@/src/component/common/AppButton";
// import AppInput from "@/src/component/common/AppInput";

import { CreateStudentData } from "../studentTypes";

interface StudentFormProps {
  formData: CreateStudentData;

  onChange: (
    field: keyof CreateStudentData,
    value: string
  ) => void;

  onSubmit: () => void;

  loading: boolean;

  buttonTitle?: string;
}

const StudentForm = ({
  formData,
  onChange,
  onSubmit,
  loading,
  buttonTitle = "Create Student",
}: StudentFormProps) => {
  return (
    <View>
      <AppInput
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) =>
          onChange("name", text)
        }
      />

      <AppInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(text) =>
          onChange("email", text)
        }
      />

      <AppInput
        placeholder="Phone"
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(text) =>
          onChange("phone", text)
        }
      />

      <AppInput
        placeholder="Department"
        value={formData.department}
        onChangeText={(text) =>
          onChange("department", text)
        }
      />

      <AppInput
        placeholder="Year"
        keyboardType="numeric"
        value={formData.year.toString()}
        onChangeText={(text) =>
          onChange("year", text)
        }
      />

      <AppButton
        title={buttonTitle}
        onPress={onSubmit}
        loading={loading}
      />
    </View>
  );
};

export default StudentForm;