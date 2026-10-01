import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { useCallback, useState } from "react";

import { router, useFocusEffect } from "expo-router";

import StudentCard from "@/src/features/students/components/StudentCard";

import { getStudents } from "@/src/features/students/studentApi";

import { Student } from "@/src/features/students/studentTypes";

import AppButton from "@/src/components/common/AppButton";

const StudentsScreen = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useFocusEffect(
    useCallback(() => {
      fetchStudents();
    }, [])
  );

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getStudents();

      setStudents(data);
    } catch (error) {
      console.log(
        "Failed to fetch students:",
        error
      );

      setError(
        "Failed to load students."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
        />

        <Text style={styles.message}>
          Loading students...
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
        Students
      </Text>

      <AppButton
        title="Add Student"
        onPress={() =>
          router.push(
            "/student/create"
          )
        }
      />

      {students.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.message}>
            No students found.
          </Text>
        </View>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) =>
            item.id.toString()
          }
          renderItem={({ item }) => (
            <StudentCard
              student={item}
            />
          )}
          contentContainerStyle={
            styles.list
          }
        />
      )}

    </View>
  );
};

export default StudentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },

  list: {
    paddingTop: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  message: {
    marginTop: 10,
    fontSize: 16,
  },

  error: {
    fontSize: 16,
  },
});