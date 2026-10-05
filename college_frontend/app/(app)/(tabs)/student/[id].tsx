import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

import {
  useLocalSearchParams,
  router,
  useFocusEffect,
} from "expo-router";

import { useCallback, useState } from "react";

import {
  getStudent,
  deleteStudent,
} from "@/src/features/students/studentApi";

import { Student } from "@/src/features/students/studentTypes";

import AppButton from "@/src/components/common/AppButton";

const StudentDetailsScreen = () => {
  const { id } =
    useLocalSearchParams<{ id: string }>();

  const [student, setStudent] =
    useState<Student | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [deleting, setDeleting] =
    useState(false);

  const [error, setError] =
    useState("");

  // Refetch on focus so the latest data shows after returning from edit.
  useFocusEffect(
    useCallback(() => {
      fetchStudent();
    }, [id])
  );

  const fetchStudent = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getStudent(Number(id));

      setStudent(data);
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

  const handleDelete = () => {
    Alert.alert(
      "Delete Student",
      `Are you sure you want to delete ${student?.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: confirmDelete,
        },
      ]
    );
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);

      await deleteStudent(Number(id));

      Alert.alert(
        "Success",
        "Student deleted successfully.",
        [
          {
            text: "OK",
            onPress: () => {
              router.replace("/student");
            },
          },
        ]
      );
    } catch (error) {
      console.log(
        "Failed to delete student:",
        error
      );

      Alert.alert(
        "Error",
        "Failed to delete student. Please try again."
      );
    } finally {
      setDeleting(false);
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

        <AppButton title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  if (!student) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>
          Student not found.
        </Text>

        <AppButton
          title="Go Back"
          onPress={() => router.back()}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Student Details
      </Text>

      <View style={styles.card}>
        <Text style={styles.name}>
          {student.name}
        </Text>

        <Text style={styles.text}>
          Email: {student.email}
        </Text>

        <Text style={styles.text}>
          Phone: {student.phone}
        </Text>

        <Text style={styles.text}>
          Department: {student.department}
        </Text>

        <Text style={styles.text}>
          Year: {student.year}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <AppButton
          title="Edit Student"
          onPress={() =>
            router.push(
              `/student/${student.id}/edit`
            )
          }
        />

        <View style={styles.buttonSpacing} />

        <AppButton
          title="Delete Student"
          variant="danger"
          onPress={handleDelete}
          loading={deleting}
        />

        <View style={styles.buttonSpacing} />

        <AppButton
          title="Go Back"
          onPress={() => router.back()}
        />
      </View>
    </View>
  );
};

export default StudentDetailsScreen;

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

  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },

  text: {
    fontSize: 16,
    marginBottom: 8,
  },

  buttonContainer: {
    marginTop: 20,
  },

  buttonSpacing: {
    height: 10,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  message: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
  },

  error: {
    fontSize: 16,
    marginBottom: 20,
  },
});