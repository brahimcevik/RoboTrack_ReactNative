import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Modal,
  Alert
} from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { LineChart } from 'react-native-chart-kit';

const WeatherScreen = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const apiKey = "0c0dcdc7e9b2975a7e115ed4ec2ae3ab";
      const latitude = 36.889173;
      const longitude = 30.676279;
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("API isteği başarısız oldu");
      
      const data = await response.json();
      const formattedData = data.list.map((reading) => ({
        date: new Date(reading.dt * 1000),
        temperature: Math.floor(reading.main.temp),
        weatherType: reading.weather[0].main,
        day: new Intl.DateTimeFormat("tr-TR", { weekday: "long" }).format(
          new Date(reading.dt * 1000)
        ),
        humidity: reading.main.humidity,
        windSpeed: reading.wind.speed,
      }));

      setWeatherData(formattedData);
      
      // Yüksek rüzgar hızı kontrolü
      const highWindSpeed = formattedData.some(data => data.windSpeed > 3);
      if (highWindSpeed) {
        Alert.alert(
          "Yüksek Rüzgar Uyarısı",
          "Rüzgar hızı yüksek! Lütfen dikkatli olun.",
          [{ text: "Tamam" }]
        );
      }
    } catch (error) {
      console.error("Hava durumu verisi alınamadı:", error);
      Alert.alert("Hata", "Hava durumu bilgisi alınamadı");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case 'Clear':
        return '☀️';
      case 'Clouds':
        return '☁️';
      case 'Rain':
        return '🌧️';
      case 'Snow':
        return '❄️';
      case 'Thunderstorm':
        return '⛈️';
      case 'Drizzle':
        return '🌦️';
      case 'Mist':
      case 'Fog':
        return '🌫️';
      default:
        return '🌤️';
    }
  };

  const WeatherCard = ({ data }) => (
    <TouchableOpacity
      style={[
        styles.weatherCard,
        { backgroundColor: isDark ? '#335C69' : '#4a7d8c' }
      ]}
      onPress={() => {
        setSelectedDay(data);
        setModalVisible(true);
      }}
    >
      <Text style={styles.weatherIcon}>{getWeatherIcon(data.weatherType)}</Text>
      <Text style={styles.temperature}>{data.temperature}°C</Text>
      <Text style={styles.day}>{data.day}</Text>
    </TouchableOpacity>
  );

  const WeatherDetailModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={[
          styles.modalContent,
          { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }
        ]}>
          <Text style={[styles.modalTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            {selectedDay?.day} - Detaylı Hava Durumu
          </Text>
          
          {selectedDay && (
            <View style={styles.detailsContainer}>
              <Text style={[styles.detailText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                Sıcaklık: {selectedDay.temperature}°C
              </Text>
              <Text style={[styles.detailText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                Nem: %{selectedDay.humidity}
              </Text>
              <Text style={[styles.detailText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                Rüzgar Hızı: {selectedDay.windSpeed} m/s
              </Text>
              <Text style={[styles.detailText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                Hava Durumu: {selectedDay.weatherType}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#FFFFFF' }]}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#FFFFFF' }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {weatherData &&
          weatherData
            .filter((_, index) => index % 8 === 0)
            .map((data, index) => (
              <WeatherCard key={index} data={data} />
            ))}
      </ScrollView>
      
      {selectedDay && <WeatherDetailModal />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollView: {
    flexGrow: 0,
  },
  weatherCard: {
    padding: 20,
    borderRadius: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 160,
  },
  weatherIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  temperature: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  day: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 15,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default WeatherScreen; 