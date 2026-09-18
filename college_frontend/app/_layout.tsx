import {Stack} from "expo-router"
import {AuthContextProvider} from "@/src/context/AuthContext";

const RootLayout = () => {
  return (
    <AuthContextProvider>
      <Stack screenOptions={{headerShown:false}}>
          <Stack.Screen name="(auth)"/>
      </Stack>
    </AuthContextProvider>
)
}

export default RootLayout