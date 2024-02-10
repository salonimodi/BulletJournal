import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View , ImageBackground} from 'react-native';
import ToDoList from './components/to-do-list/ToDoList';
import Journal from './components/journal/Journal';
import Header from './components/header/Header';
import StickyNotesContainer from './components/sticky-notes/StcikyNotesContainer';

export default function App() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleComponentClick = (component) => {
    setActiveComponent(component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'To Do List':
        return <ToDoList />;
      case 'Journal':
        return <Journal />;
      case 'Sticky Note':
        return <StickyNotesContainer />;
      case 'Tracker':
        // return <Tracker />;
      default:
        return null;
    }
  };

  return (
    <ImageBackground
      source={require('./assets/homepage.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Header />
          </View>
          <View style={styles.content}>
            {renderComponent() || (
              <View style={styles.sectionsContainer}>
                <TouchableOpacity style={styles.section} onPress={() => handleComponentClick('To Do List')}>
                  <Text>To Do List</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.section} onPress={() => handleComponentClick('Journal')}>
                  <Text>Journal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.section} onPress={() => handleComponentClick('Sticky Note')}>
                  <Text>Sticky Note</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.section} onPress={() => handleComponentClick('Tracker')}>
                  <Text>Tracker</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <StatusBar style="auto" />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    height: '60%',
    borderColor: 'red',
    borderWidth: 2,
    padding: 10,
  },
  section: {
    width: '48%',
    marginBottom: 10,
    marginTop: 10,
    borderColor: 'red',
    height: 100,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', // Make tiles solid white
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust opacity as needed
  },
});
