import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import ToDoList from "../components/to-do-list/ToDoList";
import Header from "../components/header/Header";
import StickyNotesContainer from "../components/sticky-notes/StcikyNotesContainer";
import JournalEntryScreen from "../components/journalling/JournalEntryScreen"
import Footer from "../components/footer/Footer";
import TrackerTemplate from "../components/tracker-template/Tracker";

const MainScreen = ({navigation, route }) => {
  const [activeComponent, setActiveComponent] = useState(null);
  const { token } = route.params;

  const handleComponentClick = (component) => {
    setActiveComponent(component);
  };

  const navigateToHomePage = () => {
    setActiveComponent(null); 
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "To Do List":
        return <ToDoList token={token}/>;
      case "Journal":
        return <JournalEntryScreen token={token}/>
      case "Sticky Note":
        return <StickyNotesContainer token={token}/>;
      case "Tracker":
        return <TrackerTemplate token={token}/>;
      default:
        return null;
    }
  };

  return (
    <ImageBackground
      source={require("../assets/homepage.jpeg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Header navigation={navigation} />
          </View>
          <View style={styles.content}>
            {renderComponent() || (
              <View style={styles.sectionsContainer}>
                <TouchableOpacity
                  style={styles.section}
                  onPress={() => handleComponentClick("To Do List")}
                >
                  <Text style={styles.sectionText}>To Do List</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.section}
                  onPress={() => handleComponentClick("Journal")}
                >
                  <Text style={styles.sectionText}>Journal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.section}
                  onPress={() => handleComponentClick("Sticky Note")}
                >
                  <Text style={styles.sectionText}>Sticky Note</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.section}
                  onPress={() => handleComponentClick("Tracker")}
                >
                  <Text style={styles.sectionText}>Tracker</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.footer}>
          <Footer onPress={navigateToHomePage} isHomePage={true}/>
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
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    width: "100%",
    height: "60%",
    padding: 10,
  },
  section: {
    width: "45%",
    margin: 5,
    height: 120,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 2,
    borderColor: "rgba(0, 255, 0, 0.5)",
  },
  sectionText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  footer: {
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: "center",
  }
});

export default MainScreen;