import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView, StatusBar, Platform } from 'react-native';
import { useTheme } from './ThemeContext';
import NavBar from './NavBar';
import CarList from './MainPage/CarList';
import RobotDetails from './MainPage/RobotDetails';

const { width } = Dimensions.get('window');
const isTablet = width > 768;

const MainPage = ({ navigation }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const backgroundColor = isDark ? '#121212' : 'white';
  const textColor = isDark ? 'white' : 'black';
  const borderColor = isDark ? '#333' : '#ccc';

  const [selectedRobotId, setSelectedRobotId] = useState(null);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={backgroundColor} />
      <NavBar />
      <View style={[styles.mainContainer, { backgroundColor }]}>
        <ScrollView style={styles.contentContainer}>
          <View style={[styles.container, { backgroundColor, flexDirection: isTablet ? 'row' : 'column' }]}>
            
            {/* Sol Sütun - Araç Listesi veya Robot Detayları */}
            <View style={[styles.leftColumn, { borderColor, borderRightWidth: isTablet ? 1 : 0, borderBottomWidth: isTablet ? 0 : 1 }]}>

              <View style={[styles.cardContainer, { backgroundColor: isDark ? '#1e1e1e' : '#f0f0f0' }]}>
                {selectedRobotId ? (
                  <RobotDetails 
                    robotId={selectedRobotId} 
                    goBack={() => setSelectedRobotId(null)} 
                  />
                ) : (
                  <CarList onSelectRobot={(robotId) => setSelectedRobotId(robotId)} />
                )}
              </View>

            </View>
            
            {/* Sağ Sütun - Hava Durumu ve Google Harita */}
            <View style={styles.rightColumn}>
              <View style={[styles.weatherContainer, { backgroundColor: isDark ? '#1a2a3a' : '#d0e8f2' }]}>
                <Text style={[styles.text, { color: textColor }]}>🌤️ Hava Durumu</Text>
              </View>
              <View style={[styles.mapContainer, { backgroundColor: isDark ? '#2a2a2a' : '#e0e0e0' }]}>
                <Text style={[styles.text, { color: textColor }]}>🗺️ Google Maps</Text>
              </View>
            </View>

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 60 : 60,
  },
  mainContainer: { flex: 1 },
  contentContainer: { flex: 1 },
  container: { flex: 1, paddingTop: 10, paddingHorizontal: 10 },
  leftColumn: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  rightColumn: { flex: 1, padding: 10 },
  cardContainer: { width: '95%', height: isTablet ? 400 : 300, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
  weatherContainer: { height: isTablet ? 150 : 120, justifyContent: 'center', alignItems: 'center', marginBottom: 10, borderRadius: 10 },
  mapContainer: { height: isTablet ? 240 : 180, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
  text: { fontSize: 16, fontWeight: 'bold' },
});

export default MainPage;
