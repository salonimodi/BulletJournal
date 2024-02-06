import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the plus icon

const StickyNote = () => {
  const [notes, setNotes] = useState([{ id: 1, text: '', color: '#ffcc00' }]);
  const [noteText, setNoteText] = useState('');
  const [noteColor, setNoteColor] = useState('#ffcc00'); // Default color: yellow

  const handleColorChange = (color) => {
    setNoteColor(color);
  };

  const addNote = () => {
    const newNote = {
      id: Math.random(),
      text: noteText,
      color: noteColor,
    };
    setNotes([...notes, newNote]);
    setNoteText('');
  };

  const removeNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {notes.map((note) => (
        <View key={note.id} style={[styles.stickyNote, { backgroundColor: note.color }]}>
          <TextInput
            style={styles.noteInput}
            placeholder="Type your note here..."
            value={note.text}
            onChangeText={(text) => setNotes(notes.map((n) => (n.id === note.id ? { ...n, text } : n)))}
            multiline
          />
          <View style={styles.colorPickerContainer}>
            <TouchableOpacity
              style={[styles.colorOption, { backgroundColor: '#ffcc00' }]}
              onPress={() => handleColorChange('#ffcc00')}
            />
            <TouchableOpacity
              style={[styles.colorOption, { backgroundColor: '#ff6666' }]}
              onPress={() => handleColorChange('#ff6666')}
            />
            <TouchableOpacity
              style={[styles.colorOption, { backgroundColor: '#66cc99' }]}
              onPress={() => handleColorChange('#66cc99')}
            />
          </View>
          <TouchableOpacity onPress={() => removeNote(note.id)} style={styles.deleteButton}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
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
  stickyNote: {
    width: 150,
    minHeight: 150,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  noteInput: {
    flex: 1,
    fontSize: 16,
  },
  colorPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
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
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StickyNote;
