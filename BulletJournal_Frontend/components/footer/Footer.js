import React from "react";
import { TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Footer = ({ onPress, isHomePage }) => {
  const heartAnimation = new Animated.Value(0);

  const startAnimation = () => {
    Animated.timing(heartAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      heartAnimation.setValue(0);
    });
  };

  const homeStyle = {
    transform: [
      {
        scale: heartAnimation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.2, 1],
        }),
      },
    ],
  };

  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
        startAnimation();
      }}
      style={[styles.button, isHomePage && styles.homeButton]}
    >
      <Animated.View style={homeStyle}>
        <Ionicons name="home" size={24} color="#ff1493" />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  homeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
});

export default Footer;
