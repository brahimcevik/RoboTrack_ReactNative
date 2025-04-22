import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated, Easing } from 'react-native';
import { useTheme } from '../ThemeContext';

const Weather = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const textColor = isDark ? 'white' : 'black';
  const accentColor = isDark ? '#4a90e2' : '#2176ff';
  
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchWeatherData();
    startRotation();
  }, []);

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000, // 10 saniye
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const fetchWeatherData = async () => {
    try {
      // OpenWeatherMap API anahtarı
      const API_KEY = '0c0dcdc7e9b2975a7e115ed4ec2ae3ab';
      // İstanbul koordinatları (varsayılan olarak)
      const lat = 62.0333;
      const lon = 129.7;
      
      if (!API_KEY) {
        throw new Error('Lütfen geçerli bir API anahtarı ekleyin');
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      
      const data = await response.json();
      
      if (response.ok) {
        setWeatherData(data);
      } else {
        throw new Error(data.message || 'Hava durumu verileri alınamadı');
      }
    } catch (err) {
      setError(err.message || 'Hava durumu verileri alınamadı');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={accentColor} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={[styles.errorText, { color: textColor }]}>{error}</Text>
      </View>
    );
  }

  if (!weatherData) return null;

  const getWeatherIcon = () => {
    const condition = weatherData.weather[0].main.toLowerCase();
    if (condition.includes('clear')) return '☀️';
    if (condition.includes('cloud')) return '☁️';
    if (condition.includes('rain')) return '🌧️';
    if (condition.includes('snow')) return '❄️';
    if (condition.includes('thunderstorm')) return '⛈️';
    return '🌤️';
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a2a3a' : '#d0e8f2' }]}>
      <View style={styles.weatherCard}>
        <View style={styles.mainInfo}>
          <Text style={[styles.temperature, { color: textColor }]}>
            {Math.round(weatherData.main.temp)}°C
          </Text>
          <Animated.Text style={[styles.weatherIcon, { transform: [{ rotate: spin }] }]}>
            {getWeatherIcon()}
          </Animated.Text>
        </View>
        
        <Text style={[styles.description, { color: textColor }]}>
          {weatherData.weather[0].description}
        </Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: textColor }]}>Yüksek</Text>
            <Text style={[styles.detailValue, { color: accentColor }]}>
              {Math.round(weatherData.main.temp_max)}°
            </Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: textColor }]}>Düşük</Text>
            <Text style={[styles.detailValue, { color: accentColor }]}>
              {Math.round(weatherData.main.temp_min)}°
            </Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: textColor }]}>Nem</Text>
            <Text style={[styles.detailValue, { color: accentColor }]}>
              {weatherData.main.humidity}%
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
  },
  weatherCard: {
    width: '100%',
    alignItems: 'center',
    padding: 5,
  },
  mainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  temperature: {
    fontSize: 42,
    fontWeight: 'bold',
    marginRight: 8,
  },
  weatherIcon: {
    fontSize: 36,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 5,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    marginBottom: 2,
    opacity: 0.8,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  divider: {
    width: 1,
    height: '70%',
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
    marginHorizontal: 5,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    padding: 8,
  },
});

export default Weather;
