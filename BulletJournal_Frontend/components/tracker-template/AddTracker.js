import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const AddTracker = ({ token }) => {
  const [trackerName, setTrackerName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://192.168.1.41:3000/api/tracker/add",
        {
          trackerName,
          frequency,
          selectedDay,
          selectedDate,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log("Tracker added successfully");
    } catch (error) {
      console.error("Failed to add tracker:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tracker Name"
        value={trackerName}
        onChangeText={(text) => setTrackerName(text)}
      />
      <Picker
        selectedValue={frequency}
        style={styles.input}
        onValueChange={(itemValue) => setFrequency(itemValue)}
      >
        <Picker.Item label="Select Frequency" value="" />
        <Picker.Item label="Daily" value="daily" />
        <Picker.Item label="Weekly" value="weekly" />
        <Picker.Item label="Monthly" value="monthly" />
      </Picker>
      {frequency === "monthly" && (
        <TextInput
          style={styles.input}
          placeholder="Enter Date (e.g., 15)"
          keyboardType="numeric"
          value={selectedDate}
          onChangeText={(text) => setSelectedDate(text)}
        />
      )}
      {frequency === "weekly" && (
        <Picker
          selectedValue={selectedDay}
          style={styles.input}
          onValueChange={(itemValue) => setSelectedDay(itemValue)}
        >
          <Picker.Item label="Select Day" value="" />
          <Picker.Item label="Monday" value="1" />
          <Picker.Item label="Tuesday" value="2" />
          <Picker.Item label="Wednesday" value="3" />
          <Picker.Item label="Thursday" value="4" />
          <Picker.Item label="Friday" value="5" />
          <Picker.Item label="Saturday" value="6" />
          <Picker.Item label="Sunday" value="7" />
        </Picker>
      )}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100, // Adjust as needed
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    bottom: 20,


  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default AddTracker;

