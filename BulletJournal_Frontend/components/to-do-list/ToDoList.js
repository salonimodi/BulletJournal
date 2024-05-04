import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

const BASE_URL = "http://192.168.1.41:3000/api";

const TodoList = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get(`http://192.168.1.41:3000/api/todos`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks from the backend:", error);
      });
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      axios
        .post(
          `${BASE_URL}/todos`,
          { description: newTask, completed: false },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )
        .then((response) => {
          setTasks([...tasks, response.data]);
          setNewTask("");
        })
        .catch((error) => {
          console.error("Error adding task on the backend:", error);
        });
    }
  };

  const toggleTask = (taskId) => {
    axios
      .put(
        `${BASE_URL}/todos/${taskId}`,
        { completed: !tasks.find((task) => task._id === taskId).completed },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, completed: !task.completed } : task
          )
        );
      })
      .catch((error) => {
        console.error("Error updating task status on the backend:", error);
      });
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`${BASE_URL}/todos/${taskId}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      })
      .catch((error) => {
        console.error("Error deleting task on the backend:", error);
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <Checkbox value={item.completed} onValueChange={() => toggleTask(item._id)} />
      <Text
        style={{
          marginLeft: 10,
          textDecorationLine: item.completed ? "line-through" : "none",
          flex: 1,
        }}
      >
        {item.description}
      </Text>
      <TouchableOpacity
        onPress={() => deleteTask(item._id)}
        style={{ marginLeft: "auto" }}
      >
        <Feather name="trash-2" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task"
          value={newTask}
          onChangeText={(description) => setNewTask(description)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          key = {(item) => item?.id?.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    flex: 1,
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    width: "100%",
  },
  taskContainer: {
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  deleteButton: {
    color: "red",
    marginLeft: "auto",
  },
  listContainer: {
    flexGrow: 1,
  },
});

export default TodoList;
