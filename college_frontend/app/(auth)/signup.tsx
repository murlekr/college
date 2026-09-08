import { useState } from "react";
import {   ActivityIndicator,  Alert,  Pressable,  StyleSheet,  Text,  TextInput,  View,} from "react-native";
import {router} from "expo-router"
import {   registerUser,   RegisterData, } from "@/src/services/authApi";
import SignUpform from "@/src/components/auth/SignUpForm"; 
import useForm from "@/src/hooks/useForm";
import { SignupFormData } from "@/src/types/auth";

export default function SignupScreen() {
 
  const {formData,handleChange,resetForm}=useForm<SignupFormData>({
    username:"",
    email:"",
    password:"",
    password2:""
  })
  const [loading, setLoading] = useState(false);


  

  const handleSignup = async () => {

    const {
      username,
      email,
      password,
      password2

    }=formData
    if (!username || !email || !password || !password2) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== password2) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    const data: RegisterData = {
      username,
      email,
      password,
      password2,
    };

    try {
      setLoading(true);

      const response = await registerUser(data);

      console.log("Signup successful:", response);

      Alert.alert(
        "Success",
        "Account created successfully",

        [
          {text:"OK",
            onPress:()=>{
              router.replace("/login")
            }
          }
        ]
          
      );

    resetForm()
    } catch (error: any) {
      console.log("Signup error:", error);

      if (error.response) {
        console.log(
          "Backend response:",
          error.response.data
        );

        Alert.alert(
          "Signup Failed",
          JSON.stringify(error.response.data)
        );
      } else {
        Alert.alert(
          "Signup Failed",
          "Unable to connect to the server"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>

      <SignUpform formData={formData} onChange={handleChange} loading={loading} onSubmit={handleSignup}/>

    </View>
  );
}

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