import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import StickyNote from './StickyNote';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the plus icon

const StickyNotesContainer = () => {
  const [notes, setNotes] = useState([{ id: 1, text: '', color: '#ffcc00' }]);
  
  const addNote = () => {
    const newNote = {
      id: Math.random(),
      text: '',
      color: '#ffcc00', // Default color: yellow
    };
    setNotes([...notes, newNote]);
  };

  const removeNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {notes.map((note) => (
        <StickyNote key={note.id} note={note} removeNote={removeNote} />
      ))}
      <TouchableOpacity onPress={addNote} style={styles.addButton}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
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
