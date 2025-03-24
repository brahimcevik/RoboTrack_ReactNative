import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useTheme } from "../ThemeContext";
import CarCard from "./CarCard";
import { useNavigation } from "@react-navigation/native";
import getApiUrl from "../MainPage/api";

const CarList = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigation = useNavigation();

  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCarData();
  }, []);

  const fetchCarData = async () => {
    try {
      setLoading(true);
      const response = await fetch(getApiUrl());
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      // API verisini uygun formata çeviriyoruz
      const formattedData = data.map(robot => ({
        id: String(robot.no), // robot.no'yu string yapıyoruz ki hataları önleyelim
        ugvName: robot.ugvName || `Robot ${robot.no}`,
        ugvColor: robot.ugvColor || "Gray",
      }));

      setCarData(formattedData);
      setError(null);
    } catch (error) {
      setError("Veri yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? "#1E1E1E" : "#f5f5f5" }]}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={isDark ? "#4caf50" : "#2e7d32"} />
          <Text style={[styles.loadingText, { color: isDark ? "#ffffff" : "#000000" }]}>Yükleniyor...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: isDark ? "#ff6b6b" : "#d32f2f" }]}>{error}</Text>
        </View>
      ) : (
        <View style={styles.cardContainer}>
          {carData.map(car => (
            <TouchableOpacity key={car.id} onPress={() => navigation.navigate("RobotDetailsScreen", { robotId: car.id })}>
              <CarCard ugvName={car.ugvName} ugvColor={car.ugvColor} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  cardContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", padding: 10 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, minHeight: 200 },
  loadingText: { marginTop: 10, fontSize: 16 },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, minHeight: 200 },
  errorText: { fontSize: 16, textAlign: "center", marginBottom: 15, paddingHorizontal: 20 },
});

export default CarList;
