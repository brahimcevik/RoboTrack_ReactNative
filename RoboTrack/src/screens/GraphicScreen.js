import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../components/ThemeContext';

const { width } = Dimensions.get('window');

const GraphicScreen = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const backgroundColor = isDark ? '#121212' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';
  const chartBarColor = '#4CAF50';
  const chartBgColor = isDark ? '#2a2a2a' : '#f0f0f0';

  // Örnek veri
  const data = [
    { label: 'Pzt', value: 30 },
    { label: 'Sal', value: 45 },
    { label: 'Çar', value: 28 },
    { label: 'Per', value: 80 },
    { label: 'Cum', value: 60 },
    { label: 'Cmt', value: 45 },
    { label: 'Paz', value: 15 },
  ];

  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Haftalık İstatistikler</Text>
      
      <View style={[styles.chartContainer, { backgroundColor: chartBgColor }]}>
        <View style={styles.chart}>
          {data.map((item, index) => (
            <View key={index} style={styles.barContainer}>
              <View 
                style={[
                  styles.bar, 
                  { 
                    height: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: chartBarColor 
                  }
                ]} 
              />
              <Text style={[styles.barLabel, { color: textColor }]}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={[styles.statsContainer, { backgroundColor: chartBgColor }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: textColor }]}>45</Text>
          <Text style={[styles.statLabel, { color: textColor }]}>Ortalama</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: textColor }]}>80</Text>
          <Text style={[styles.statLabel, { color: textColor }]}>En Yüksek</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: textColor }]}>15</Text>
          <Text style={[styles.statLabel, { color: textColor }]}>En Düşük</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chartContainer: {
    height: 250,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  chart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
  },
  bar: {
    width: 20,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  barLabel: {
    marginTop: 8,
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default GraphicScreen; 