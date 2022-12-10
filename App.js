import 'react-native-gesture-handler';

import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Navigation from './src/navigation';

export default function App() {
  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
}
