import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import AddTrackerPage from "./AddTracker";
import TrackingPage from "./Tracking";

const TrackerHomePage = ({ token }) => {
  const [activePage, setActivePage] = useState("addTracker");

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              activePage === "addTracker" && styles.activeButton,
            ]}
            onPress={() => handlePageChange("addTracker")}
          >
            <Text style={styles.buttonText}>Add Tracker</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              activePage === "tracking" && styles.activeButton,
            ]}
            onPress={() => handlePageChange("tracking")}
          >
            <Text style={styles.buttonText}>Tracking</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pageContainer}>
          {activePage === "addTracker" && <AddTrackerPage token={token} />}
          {activePage === "tracking" && <TrackingPage token={token} />}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: 'rgba(0, 255, 0, 0.5)',
    borderWidth:2,
    borderRadius: 10,
  },
  activeButton: {
    backgroundColor: 'rgba(0, 255, 0, 0.5)',
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  pageContainer: {
    flex: 1,
    paddingHorizontal: 20,
    flex: 1,
    width: "100%",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    flex: 1,
    width: "100%",
  },
});




export default TrackerHomePage;
