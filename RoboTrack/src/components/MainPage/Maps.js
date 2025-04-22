import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useTheme } from '../ThemeContext';

const Maps = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const initialRegion = {
    latitude: 39.769736108873815,
    longitude: 39.37325320122449,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const markers = [
    {
      id: 1,
      coordinate: {
        latitude: 38.48914,
        longitude: 43.40889,
      },
      title: "Robot1",
      description: "Robot 1'in konumu",
      icon: { uri: "https://i.hizliresim.com/hh9lylh.png" }
    },
    {
      id: 2,
      coordinate: {
        latitude: 39.769674,
        longitude: 39.373085,
      },
      title: "Robot2",
      description: "Robot 2'nin konumu",
      icon: { uri: "https://i.hizliresim.com/7lzzkk1.png" }
    },
    {
      id: 3,
      coordinate: {
        latitude: 39.769834,
        longitude: 39.373418,
      },
      title: "Robot3",
      description: "Robot 3'ün konumu",
      icon: { uri: "https://i.hizliresim.com/984m89w.png" }
    }
  ];

  return (
    <View style={[
      styles.container, 
      { backgroundColor: isDark ? '#1a2a3a' : '#d0e8f2' }
    ]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        mapType="satellite"
        zoomEnabled={true}
        minZoomLevel={3}
        maxZoomLevel={22}
        rotateEnabled={true}
        scrollEnabled={true}
        showsBuildings={true}
        zoomControlEnabled={true}
        moveOnMarkerPress={false}
        zoomTapEnabled={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
        showsTraffic={true}
        showsIndoors={true}
        pitchEnabled={true}
        toolbarEnabled={true}
        loadingEnabled={true}
        loadingIndicatorColor="#666666"
        loadingBackgroundColor="#eeeeee"
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            image={marker.icon}
          >
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{marker.title}</Text>
                <Text style={styles.calloutText}>
                  Enlem: {marker.coordinate.latitude}
                </Text>
                <Text style={styles.calloutText}>
                  Boylam: {marker.coordinate.longitude}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  calloutContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    width: 150,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  calloutText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
});

export default Maps; 