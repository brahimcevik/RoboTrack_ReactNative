import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../ThemeContext";

const CarCard = ({ ugvName, ugvColor }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: isDark ? '#335C69' : '#4a7d8c' }]}>
      <Text style={styles.text}>{ugvName}</Text>
      <Text style={styles.text}>{ugvColor}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 120,
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
    margin: 5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CarCard;
