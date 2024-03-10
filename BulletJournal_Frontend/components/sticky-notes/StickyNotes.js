import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StickyNotes = ({ note, removeNote, updateNote}) => {
  const [noteText, setNoteText] = useState(note.content);
  const [noteColor, setNoteColor] = useState(note.color);

  const handleColorChange = (color) => {
    setNoteColor(color);
    updateNote({ ...note, color });
  };

  const handleTextChange = (text) => {
    setNoteText(text);
    updateNote({ ...note, content: text });
  };

  return (
    <View style={[styles.stickyNote, { backgroundColor: noteColor }]}>
      <TextInput
        style={styles.noteInput}
        placeholder="Type your note here..."
        value={noteText}
        onChangeText={handleTextChange}
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
      <TouchableOpacity onPress={() => removeNote(note._id)} style={styles.deleteButton}>
        <Ionicons name="close" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  stickyNote: {
    width: "100%",
    minHeight: 200,
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

export default StickyNotes;
