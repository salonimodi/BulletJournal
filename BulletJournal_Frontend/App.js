// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import TodoList from './components/to-do-list/ToDoList';


// export default function App() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.todoListContainer}>
//         <TodoList />
//       </View>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//     marginTop:40,
//     marginBottom: 20
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   todoListContainer: {
//     flex: 5,
//     width: '100%',
//   },
// });

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
// import Header from './components/Header';
// import Footer from './components/Footer';
import TodoList from './components/to-do-list/ToDoList';
import StickyNote from './components/sticky-notes/StickyNotes';
import Journal from './components/journal/Journal';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <View style={styles.sectionsContainer}>
        <View style={styles.section}>
          {/* Add your component for the first section here */}
        </View>
        <View style={styles.section}>
          <Journal />
        </View>
        <View style={styles.section}>
          {/* Add your component for the third section here */}
          <TodoList />
        </View>
        <View style={styles.section}>
         <StickyNote />
        </View>
      </View>
      {/* <Footer /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop:40
  },
  sectionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    height: "100%",
    borderColor: "red",
    borderWidth: 2
  },
  section: {
    width: '48%', // Adjust width as needed, this will create a gap between sections
    marginBottom: 10,
    marginTop: 10,
    borderColor:"red",
    height:"40%",
    borderWidth: 2
  },
});
