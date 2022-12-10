import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import Splash from '../screens/splash';
import { TouchableOpacity } from 'react-native';
import BottomTabs from './BottomTabNavigation';

const Stack = createStackNavigator();

export default function NavigationStack() {
  const BackIcon = ({ navigation }) => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name={'chevron-left'} size={30} color={'#fff'} />
    </TouchableOpacity>
  );
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Splash'
        options={({ navigation }) => ({
         headerShown: false,
          headerLeft: () => <BackIcon navigation={navigation} />,
        })}
        component={Splash}
      />
      <Stack.Screen
        name='Weather'
        options={({ navigation }) => ({
         headerShown: false,
          headerLeft: () => <BackIcon navigation={navigation} />,
        })}
        component={BottomTabs}
      />
    </Stack.Navigator>
  );
}
