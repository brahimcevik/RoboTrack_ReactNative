import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet, Alert, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import { ThemeContext } from './ThemeContext';
import { SunIcon, MoonIcon } from 'react-native-heroicons/solid';

const SignInPage = ({ navigation, setIsAuthenticated }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isDark = theme === 'dark';
  const backgroundColor = isDark ? '#121212' : 'white';
  const textColor = isDark ? 'white' : 'black';
  const inputBgColor = isDark ? '#2a2a2a' : 'white';
  const inputBorderColor = isDark ? '#444' : '#ddd';

  const logoSource = isDark 
    ? require('../components/assets/logoDark.png') 
    : require('../components/assets/logo.png');

  const handleLogin = () => {
    console.log('Login attempt:', { username, password });
    console.log('setIsAuthenticated:', setIsAuthenticated);
    
    if (username === 'Admin' && password === '123456') {
      console.log('Credentials correct, attempting to authenticate');
      
      // Doğrudan true olarak ayarlayalım
      if (typeof setIsAuthenticated === 'function') {
        setIsAuthenticated(true);
        console.log('Authentication successful');
      } else {
        console.log('setIsAuthenticated is not a function');
        Alert.alert('Hata', 'Kimlik doğrulama işlevi bulunamadı!');
      }
    } else {
      console.log('Invalid credentials');
      Alert.alert('Hata', 'Kullanıcı adı veya şifre hatalı!');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
      />
      <View style={[styles.container, { backgroundColor }]}>
        <View style={styles.logoContainer}>
          <Image source={logoSource} style={styles.logo} />
        </View>

        <TextInput
          placeholder="Kullanıcı adı"
          value={username}
          onChangeText={setUsername}
          style={[styles.input, { 
            backgroundColor: inputBgColor, 
            borderColor: inputBorderColor,
            color: textColor 
          }]}
          placeholderTextColor={isDark ? '#aaa' : '#777'}
        />

        <TextInput
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[styles.input, { 
            backgroundColor: inputBgColor, 
            borderColor: inputBorderColor,
            color: textColor 
          }]}
          placeholderTextColor={isDark ? '#aaa' : '#777'}
        />

        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Giriş Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
          {isDark ? 
            <SunIcon size={24} color="white" /> : 
            <MoonIcon size={24} color="black" />
          }
          <Text style={[styles.themeText, { color: isDark ? 'white' : 'black' }]}>
            {isDark ? 'Gündüz Modu' : 'Gece Modu'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  input: {
    width: '80%',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  loginButton: {
    width: '80%',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  themeText: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default SignInPage;
