import { View, Text } from 'react-native'
import React from 'react'

import { Stack } from 'expo-router'

const StudentsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Students" }} />
      <Stack.Screen name="create" options={{ title: "Create Student" }} />
      <Stack.Screen name="{id}" options={{ title: "Students Details" }} />
    </Stack>
  )
}

export default StudentsLayout