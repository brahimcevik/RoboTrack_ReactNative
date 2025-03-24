import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../components/ThemeContext';

const ModeScreen = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const backgroundColor = isDark ? '#121212' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.card, { backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0' }]}>
        <Text style={[styles.title, { color: textColor }]}>Mod Seçimi</Text>
        <Text style={[styles.description, { color: textColor }]}>
          Bu ekranda farklı modlar arasında geçiş yapabilirsiniz.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '90%',
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
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default ModeScreen; 