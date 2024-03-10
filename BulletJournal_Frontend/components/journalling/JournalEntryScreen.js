import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

const JournalEntryScreen = ({ token }) => {
  const [entry, setEntry] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // const saveEntry = () => {
  //   onSave({ entry, selectedDate });
  //   setEntry('');
  // };

  useEffect(() => {
    // Fetch journal entry for the selected date
    fetchJournalEntry(selectedDate);
  }, [selectedDate]);

  const fetchJournalEntry = (date) => {
    axios
      .get(`http://192.168.1.41:3000/api/journals/${date.toISOString().split('T')[0]}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          // If a journal entry exists for the date, set its content in the input field
          setEntry(response.data[0].content);
        } else {
          // If no journal entry exists, clear the input field
          setEntry('');
        }
      })
      .catch((error) => {
        console.error('Error fetching journal entry:', error);
      });
  };

  const saveEntry = () => {
    axios
      .post(
        `http://192.168.1.41:3000/api/journals/${
          selectedDate.toISOString().split("T")[0]
        }`,
        {
          content: entry,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        // onSave(response.data);
        // setEntry("");
      })
      .catch((error) => {
        console.error("Error saving journal entry:", error);
      });
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={(event, date) => setSelectedDate(date)}
        />
        <TextInput
          multiline
          numberOfLines={4}
          value={entry}
          onChangeText={setEntry}
          placeholder="Write about your day..."
          style={styles.input}
        />
        <Button title="Save Entry" onPress={saveEntry} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    padding: 10,
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    flex: 1,
    width: "100%",
  },
});

export default JournalEntryScreen;
