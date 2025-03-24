import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarList from './components/MainPage/CarList';
import RobotDetails from './components/MainPage/RobotDetails';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CarList">
        <Stack.Screen name="CarList" component={CarList} />
        <Stack.Screen name="RobotDetails" component={RobotDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App; 