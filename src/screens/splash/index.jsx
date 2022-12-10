import 'react-native-gesture-handler';

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text,Image,ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Splash({navigation}) {
    const [appIsReady, setAppIsReady] = useState(false);
    console.log("🚀 ~ file: App.js:14 ~ App ~ appIsReady", appIsReady)

    useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 4000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

    const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
      navigation.replace('Weather');
    }
    }, [appIsReady]);

    if (!appIsReady) {
    return null;
    }

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#fff' }}
      onLayout={onLayoutRootView}>
      <Image style={{height:200,width:200}} resizeMode='contain' source={require('../../../assets/weather.png')}/>
      <Text style={{ paddingVertical: 30,fontWeight: '700' }}>Weather App</Text>
      <ActivityIndicator size='large' color='green'/>
    </View>
  );
}
