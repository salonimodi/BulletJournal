import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Your Personal Planner</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 30,
    flexDirection: "column",
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add a semi-transparent white background
    alignItems: 'center', // Center the text horizontally
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#000', // Add black color to the text
  },
});

export default Header;
