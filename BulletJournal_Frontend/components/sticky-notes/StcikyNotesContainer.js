import React, { useState } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import StickyNotes from "./StickyNotes";
import { Ionicons } from '@expo/vector-icons';

const StickyNotesContainer = () => {
  const [notes, setNotes] = useState([{ id: 1, text: "", color: "#ffcc00" }]);

  const removeNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const addNote = () => {
    const newNote = {
      id: Math.random(),
      text: '',
      color: "#ffcc00",
    };
    setNotes([...notes, newNote]);
  };

  return (
    <View style={styles.overlay}>
      <ScrollView contentContainerStyle={styles.container}>
        {notes.map((note) => (
          <StickyNotes key={note.id} note={note} removeNote={removeNote} />
        ))}
      </ScrollView>
      <TouchableOpacity onPress={addNote} style={styles.addButton}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    flex: 1,
    width: "100%",
  },
  container: {
    padding: 10,
    width: "100%",
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StickyNotesContainer;
