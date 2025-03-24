import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

const NavBar = ({ navigation }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const textColor = isDark ? '#ffffff' : '#2e7d32'; // sabGreenHardDark rengi
  const bgColor = isDark ? '#121212' : '#ffffff';
  const searchBgColor = isDark ? '#1e1e1e' : '#4caf50'; // sabGreenDark rengi
  
  const goBack = () => {
    // React Native'de sayfayı yenilemek yerine ana sayfaya dönüş
    if (navigation) {
      navigation.navigate('Home');
    }
  };
  
  const logoSource = isDark 
    ? require('../components/assets/logoDark.png') 
    : require('../components/assets/logo.png');
  
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Logo ve Başlık Kısmı */}
      <View style={styles.logoContainer}>
        <Image 
          source={logoSource} 
          style={styles.logo} 
          resizeMode="contain"
        />
        
        {!isSmallDevice && (
          <TouchableOpacity onPress={goBack}>
            <Text style={[styles.title, { color: textColor }]}>ROBO</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Arama Kısmı */}
      <View style={[styles.searchContainer, { backgroundColor: searchBgColor }]}>
        <Ionicons name="search" size={20} color="#ffffff" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Ara"
          placeholderTextColor="#ffffff"
        />
      </View>
      
      {/* Hava Durumu Kısmı */}
      <View style={styles.weatherContainer}>
        <Text style={[styles.weatherText, { color: textColor }]}>23°C</Text>
        <Ionicons name="sunny" size={24} color={textColor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: isSmallDevice ? 1 : 2,
    paddingVertical: 5,
  },
  logo: {
    height: 80,
    width: 80,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flex: 2,
    marginHorizontal: 10,
    maxWidth: 150,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
    padding: 0,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  weatherText: {
    fontSize: 16,
    marginRight: 6,
  },
});

export default NavBar; 