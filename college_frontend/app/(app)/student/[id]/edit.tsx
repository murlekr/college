import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

import {
  useLocalSearchParams,
  router,
} from "expo-router";

import { useEffect, useState } from "react";

import StudentForm from "@/src/features/students/components/StudentForm";
import {getStudent, updateStudent, } from "@/src/features/students/studentApi";
import {CreateStudentData, } from "@/src/features/students/studentTypes";

import useForm from "@/src/hooks/useForm";

import {
  MIN_STUDENT_YEAR,
  MAX_STUDENT_YEAR,
} from "@/src/constants/student";

const EditStudentScreen = () => {
  const { id } =
    useLocalSearchParams<{ id: string }>();

  const {
    formData,
    handleChange,
    setFormData,
  } = useForm<CreateStudentData>({
    name: "",
    email: "",
    phone: "",
    department: "",
    year: 1,
  });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      setError("");

      const student =
        await getStudent(Number(id));

      setFormData({
        name: student.name,
        email: student.email,
        phone: student.phone,
        department: student.department,
        year: student.year,
      });
    } catch (error) {
      console.log(
        "Failed to fetch student:",
        error
      );

      setError(
        "Failed to load student."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.department
    ) {
      Alert.alert(
        "Missing Information",
        "Please fill in all fields."
      );

      return;
    }

    const year = Number(formData.year);

    if (
      year < MIN_STUDENT_YEAR ||
      year > MAX_STUDENT_YEAR
    ) {
      Alert.alert(
        "Invalid Year",
        `Please enter a year between ${MIN_STUDENT_YEAR} and ${MAX_STUDENT_YEAR}.`
      );

      return;
    }

    try {
      setSaving(true);

      const studentData: CreateStudentData = {
        ...formData,
        year,
      };

      const updatedStudent =
        await updateStudent(
          Number(id),
          studentData
        );

      console.log(
        "Student updated:",
        updatedStudent
      );

      Alert.alert(
        "Success",
        "Student updated successfully.",
        [
          {
            text: "OK",
            onPress: () => {
              router.replace(
                `/student/${id}`
              );
            },
          },
        ]
      );
    } catch (error) {
      console.log(
        "Failed to update student:",
        error
      );

      Alert.alert(
        "Error",
        "Failed to update student. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />

        <Text style={styles.message}>
          Loading student...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Edit Student
      </Text>

      <StudentForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={saving}
        buttonTitle="Update Student"
      />
    </View>
  );
};

export default EditStudentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  message: {
    marginTop: 10,
    fontSize: 16,
  },

  error: {
    fontSize: 16,
  },
});
