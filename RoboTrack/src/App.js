import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInPage from './components/SignInPage';
import MainPage from './components/MainPage';
import RobotDetails from './components/MainPage/RobotDetails';
import { ThemeProvider } from './components/ThemeContext';  // Tema sağlayıcı
import BottomNavigation from './components/BottomNavigation';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log('Authentication state changed:', isAuthenticated);
  }, [isAuthenticated]);

  const handleAuthentication = (value) => {
    console.log('Setting authentication to:', value);
    setIsAuthenticated(value);
  };

  return (
    <ThemeProvider>
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
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;