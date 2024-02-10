import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import Checkbox from 'expo-checkbox';
import { Feather } from '@expo/vector-icons';


const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <Checkbox
        value={item.completed}
        onValueChange={() => toggleTask(item.id)}
      />
      <Text
        style={{
          marginLeft: 10,
          textDecorationLine: item.completed ? "line-through" : "none",
          flex: 1
        }}
      >
        {item.text}
      </Text>
      <TouchableOpacity
        onPress={() => deleteTask(item.id)}
        style={{ marginLeft: "auto" }}
      >
        {/* <Text style={styles.deleteButton}>Delete</Text> */}
        <Feather name="trash-2" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
        <FlatList 
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    flex: 1,
    width: '100%'
  },
  container: {
    flex: 1,
    padding: 20

  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%'
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%'
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    width: '100%'
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
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteButton: {
    color: "red",
    marginLeft: 'auto',
  },
  listContainer: {
    flexGrow: 1,
    
  }
});

export default TodoList;