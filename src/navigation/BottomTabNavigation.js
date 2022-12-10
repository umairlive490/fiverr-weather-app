import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Alarm from '../screens/alarm';
import Calculator from '../screens/calculator';
import Weather from '../screens/weather';
import { createStackNavigator } from '@react-navigation/stack';
import AddAlarm from '../screens/alarm/AddAlarm';
import Location from '../screens/weather/Location';
import  Icon  from 'react-native-vector-icons/Feather';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const AlarmStack = () =>
    <Stack.Navigator>
      <Stack.Screen
        name='Alarm'
        options={({ navigation }) => ({
         headerShown: false,
        })}
        component={Alarm}
      />
      <Stack.Screen
        name='AddAlarm'
        options={({ navigation }) => ({
          headerTitle: 'Add Alarm',
          headerTitleStyle: { color: '#222' },
          headerTitleAlign:'center',
          headerStyle: { backgroundColor: '#ccc' },
        })}
        component={AddAlarm}
      />
    </Stack.Navigator>

const WeatherStack = () =>
    <Stack.Navigator>
      <Stack.Screen
        name='Weather'
        options={({ navigation }) => ({
         headerShown: false,
        })}
        component={Weather}
      />
      <Stack.Screen
        name='Location'
        options={({ navigation }) => ({
          headerTitle: 'Location',
          headerTitleStyle: { color: '#222' },
          headerTitleAlign:'center',
          headerStyle: { backgroundColor: '#ccc' },
        })}
        component={Location}
      />
  </Stack.Navigator>

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color }) => {
          const activeColor = '#fff';

          if (route.name === 'Weather') return <Icon name='cloud-rain' size={25} color={!focused? color: activeColor} />;
          else if (route.name === 'Calculator') return <Icon name='calendar' size={25} color={!focused? color: activeColor} />;
          else if (route.name === 'Alarm') return <Icon name='clock' size={25} color={!focused? color: activeColor} />;
        },
      })}

    >
      <Tab.Screen name="Weather" component={WeatherStack} />
      <Tab.Screen name="Calculator" component={Calculator} />
      <Tab.Screen name="Alarm" component={AlarmStack} />

    </Tab.Navigator>
  );
}