import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInPage from './src/components/SignInPage';
import MainPage from './src/components/MainPage';
import RobotDetails from './src/components/MainPage/RobotDetails';
import { ThemeProvider } from './src/components/ThemeContext';  // Önemli: Context dahil edildi
import BottomNavigation from './src/components/BottomNavigation';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // isAuthenticated değiştiğinde konsola yazdır
  useEffect(() => {
    console.log('Authentication state changed:', isAuthenticated);
  }, [isAuthenticated]);

  // setIsAuthenticated fonksiyonunu özelleştirelim
  const handleAuthentication = (value) => {
    console.log('Setting authentication to:', value);
    setIsAuthenticated(value);
  };

  return (
    <ThemeProvider>  {/* <- Burada SignInPage ve diğer bileşenlere Context veriyoruz */}
      <NavigationContainer>
        <Stack.Navigator>
          {!isAuthenticated ? (
            <Stack.Screen 
              name="SignIn"
              options={{ headerShown: false }}
            >
              {props => <SignInPage {...props} setIsAuthenticated={handleAuthentication} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen 
                name="MainPage" 
                component={BottomNavigation}
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="RobotDetails" 
                component={RobotDetails}
                options={{
                  title: 'Robot Detayları',
                  headerStyle: {
                    backgroundColor: '#4caf50',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
