import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const JournalEntryScreen = ({ onSave }) => {
  const [entry, setEntry] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const saveEntry = () => {
    onSave({ entry, selectedDate });
    setEntry('');
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
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
