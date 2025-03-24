import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import getApiUrl from "../MainPage/api";

const RobotDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { robotId } = route.params; // Parametreyi alıyoruz

  const [robotData, setRobotData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRobotData = async () => {
      try {
        const response = await fetch(getApiUrl());
        if (!response.ok) throw new Error("API request failed.");
        const data = await response.json();

        // Seçilen robotu buluyoruz
        const selectedRobot = data.find(robot => String(robot.no) === String(robotId));

        if (!selectedRobot) {
          throw new Error("Robot bulunamadı.");
        }

        setRobotData(selectedRobot);
      } catch (error) {
        setError("Veri getirilemedi.");
      } finally {
        setLoading(false);
      }
    };

    fetchRobotData();
  }, [robotId]);

  if (loading) return <ActivityIndicator size="large" color="#4caf50" />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{robotData.ugvName}</Text>
      <Text>Color: {robotData.ugvColor}</Text>
      <Text>Distance: {robotData.ugvDistance} m</Text>
      <Text>Herbicide: {robotData.ugvHerbicide} %</Text>
      <Text>Speed: {robotData.ugvSpeed} km/h</Text>
      <Button title="Geri Dön" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  errorText: { fontSize: 16, color: "red", textAlign: "center" },
});

export default RobotDetails;
