import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationStack from './NavigationStack';

export default function Navigation() {
  return (
    <NavigationContainer>
        <NavigationStack />
    </NavigationContainer>
  );
}
