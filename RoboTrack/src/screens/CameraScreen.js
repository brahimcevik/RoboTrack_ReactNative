import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const CameraScreen = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const backgroundColor = isDark ? '#121212' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.cameraPreview}>
        <Text style={[styles.previewText, { color: textColor }]}>Kamera Önizleme</Text>
      </View>
      
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="settings-outline" size={28} color={textColor} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.captureButton}>
          <View style={[styles.captureInner, { borderColor: textColor }]} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="images-outline" size={28} color={textColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cameraPreview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    margin: 16,
    borderRadius: 12,
  },
  previewText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 20,
  },
  controlButton: {
    padding: 10,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
});

export default CameraScreen; 