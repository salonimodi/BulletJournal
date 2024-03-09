import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Header = ({ navigation }) => {
  const handleLogout = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Your Personal Planner</Text>
      <View>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      </View>
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
    borderColor: 'rgba(0, 255, 0, 0.5)',
    borderWidth:2,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#000', // Add black color to the text
    paddingHorizontal:20
  },
  logoutText: {
    fontSize: 16,
    color: "#008080",
    fontWeight: "bold",
  },
});

export default Header;
