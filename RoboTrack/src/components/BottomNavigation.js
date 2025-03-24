import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from './ThemeContext';

// Import your screen components here
import HomeScreen from '../screens/HomeScreen';
import ModeScreen from '../screens/ModeScreen';
import CameraScreen from '../screens/CameraScreen';
import GraphicScreen from '../screens/GraphicScreen';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Mode') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Camera') {
            iconName = focused ? 'play-circle' : 'play-circle-outline';
          } else if (route.name === 'Graphic') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Theme') {
            iconName = theme === 'dark' ? 'sunny' : 'moon';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme === 'dark' ? '#ffffff' : '#000000',
        tabBarInactiveTintColor: theme === 'dark' ? '#666666' : '#999999',
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
          borderTopColor: theme === 'dark' ? '#333333' : '#e0e0e0',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Mode" component={ModeScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="Graphic" component={GraphicScreen} />
      <Tab.Screen 
        name="Theme" 
        component={HomeScreen} 
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            toggleTheme();
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation; 