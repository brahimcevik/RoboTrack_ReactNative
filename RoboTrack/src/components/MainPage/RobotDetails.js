import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import getApiUrl from "../MainPage/api";
import { useTheme } from "../ThemeContext";

const RobotDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { robotId } = route.params;

  const [robotData, setRobotData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRobotData = async () => {
      try {
        const response = await fetch(getApiUrl());
        if (!response.ok) throw new Error("API request failed.");
        const data = await response.json();

        // Find the selected robot by ID
        const selectedRobot = data.find(robot => robot.id === robotId);

        if (!selectedRobot) {
          throw new Error("Robot bulunamadı.");
        }

        setRobotData(selectedRobot);
      } catch (error) {
        setError("Veri yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchRobotData();
  }, [robotId]);

  if (loading) return <ActivityIndicator size="large" color="#4caf50" />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? "#1E1E1E" : "#f5f5f5" }]}>
      <View style={[styles.detailsContainer, { backgroundColor: isDark ? "#2D2D2D" : "#FFFFFF" }]}>
        <Text style={[styles.title, { color: isDark ? "#FFFFFF" : "#000000" }]}>
          {robotData.ugvName}
        </Text>
        
        <View style={styles.infoSection}>
          <Text style={[styles.label, { color: isDark ? "#AAAAAA" : "#666666" }]}>Robot ID:</Text>
          <Text style={[styles.value, { color: isDark ? "#FFFFFF" : "#000000" }]}>{robotData.id}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.label, { color: isDark ? "#AAAAAA" : "#666666" }]}>Renk:</Text>
          <Text style={[styles.value, { color: isDark ? "#FFFFFF" : "#000000" }]}>{robotData.ugvColor}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.label, { color: isDark ? "#AAAAAA" : "#666666" }]}>Mesafe:</Text>
          <Text style={[styles.value, { color: isDark ? "#FFFFFF" : "#000000" }]}>{robotData.ugvDistance} m</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.label, { color: isDark ? "#AAAAAA" : "#666666" }]}>Herbisit:</Text>
          <Text style={[styles.value, { color: isDark ? "#FFFFFF" : "#000000" }]}>{robotData.ugvHerbicide} L</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.label, { color: isDark ? "#AAAAAA" : "#666666" }]}>Hız:</Text>
          <Text style={[styles.value, { color: isDark ? "#FFFFFF" : "#000000" }]}>{robotData.ugvSpeed} km/s</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.label, { color: isDark ? "#AAAAAA" : "#666666" }]}>Konum:</Text>
          <Text style={[styles.value, { color: isDark ? "#FFFFFF" : "#000000" }]}>{robotData.carLoc}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.label, { color: isDark ? "#AAAAAA" : "#666666" }]}>Görev:</Text>
          <Text style={[styles.value, { color: isDark ? "#FFFFFF" : "#000000" }]}>{robotData.ugvMission}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.label, { color: isDark ? "#AAAAAA" : "#666666" }]}>Son Aktivite:</Text>
          <Text style={[styles.value, { color: isDark ? "#FFFFFF" : "#000000" }]}>
            {new Date(robotData.lastRunTime).toLocaleString()}
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.label, { color: isDark ? "#AAAAAA" : "#666666" }]}>Durum:</Text>
          <Text style={[styles.value, { color: robotData.status ? "#00A36C" : "#B22222" }]}>
            {robotData.status ? "Online" : "Offline"}
          </Text>
        </View>

        <Button 
          title="Geri Dön" 
          onPress={() => navigation.goBack()} 
          color={isDark ? "#4caf50" : "#2e7d32"}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  detailsContainer: {
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default RobotDetails;
