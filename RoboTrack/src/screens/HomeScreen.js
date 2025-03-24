import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import MainPage from '../components/MainPage';

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const backgroundColor = isDark ? '#121212' : '#ffffff';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <MainPage navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen; 