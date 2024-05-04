import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import StickyNotes from "./StickyNotes";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";

const StickyNotesContainer = ({ token }) => {
  const [notes, setNotes] = useState([{ id: 1, content: "", color: "#ffcc00" }]);

  useEffect(() => {
    fetchStickyNotes();
  }, []);

  const fetchStickyNotes = () => {
    axios
      .get(`http://192.168.1.41:3000/api/sticky-notes`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sticky notes from the backend:", error);
      });
  };

  const addNote = () => {
    const newNote = {
      id: Math.random(),
      content: '',
      color: "#ffcc00",
    };
    axios
      .post(`http://192.168.1.41:3000/api/sticky-notes`, newNote, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setNotes([...notes, response.data]);
      })
      .catch((error) => {
        console.error("Error adding sticky note:", error);
      });
  };

  const updateNote = (updatedNote) => {
    axios
      .put(`http://192.168.1.41:3000/api/sticky-notes/${updatedNote._id}`, updatedNote, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        setNotes((prevNotes) =>
          prevNotes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
        );
      })
      .catch((error) => {
        console.error('Error updating sticky note:', error);
      });
  };

  const removeNote = (id) => {
    axios
      .delete(`http://192.168.1.41:3000/api/sticky-notes/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        setNotes(notes.filter((note) => note._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting sticky note:', error);
      });
  };


  return (
    <View style={styles.overlay}>
      <ScrollView contentContainerStyle={styles.container}>
        {notes.map((note) => (
          <StickyNotes key={note.position} note={note} removeNote={removeNote} updateNote={updateNote}/>
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

