import { SafeAreaView, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import globalStyles from '../../styles/globalStyles'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './style';
import { getLocationWeatherData } from '../../api';

const GOOGLE_PLACES_API_KEY = 'AIzaSyC49Btb7Q5sZTsB3-GhDYm_hsF5Eeo1aTQ';

export default function Weather({navigation}) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={globalStyles.container}>
      <View>
        <Text style={[globalStyles.h1,{paddingVertical:50}]}>Current Weather</Text>
        <View style={styles.panelFill}>
         <GooglePlacesAutocomplete
        renderLeftButton={() => (
          <View style={{ zIndex: 1, left: 30, top: 10 }}>
            <Icon name='map-pin' size={22} color='#555' />
          </View>
        )}
        placeholder='Enter the city name'
        returnKeyType='search'
        fetchDetails
        styles={{
          container: {
            paddingVertical: 80,
          },
          textInput: styles.searchBar,
          description: {
            fontSize: 12,
          },
        }}
        onPress={async (data, details = null) => {
          const { lat, lng } = details?.geometry?.location || {};
          setLoading(true);
          const weather = await getLocationWeatherData(lat, lng);
          setLoading(false);
          setWeatherData(weather);
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en',
        }}
          />
          </View>
      </View>
      {!weatherData && loading ?
        <View style={{ fex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color='#fff' />
        </View>:
        weatherData && <View style={styles.weatherContainer}>
        <View style={{ alignItems: 'center', padding: 20 }}>
          <Text style={[globalStyles.h1, styles.locationName]}>{weatherData?.name}</Text>
          <Text style={[globalStyles.h2, { fontWeight: '700' }]}>{weatherData?.main.temp}°C</Text>
          <Text style={[globalStyles.h3]}>{weatherData?.weather[0].main}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={[globalStyles.h4]}>L {weatherData?.coord.lat}°</Text>
            <Text style={[globalStyles.h4, { paddingLeft: 20 }]}>H {weatherData?.coord.lon}°</Text>
          </View>
        </View>
        {/* Weather box */}
        <View style={{ padding: 30, marginTop:20, backgroundColor: '#999', borderRadius: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text>Feels</Text>
              <Text>{weatherData?.main.feels_like}</Text>
            </View>
            <View>
              <Text>Low</Text>
              <Text>{weatherData?.main.temp_min}</Text>
            </View>
            <View>
              <Text>High</Text>
              <Text>{weatherData?.main.temp_max}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 40}}>
            <View>
              <Text>Pressure</Text>
              <Text>{weatherData?.main.pressure}</Text>
            </View>
            <View>
              <Text>Humidity</Text>
              <Text>{weatherData?.main.humidity}</Text>
            </View>
            <View>
              <Text>Sea Level</Text>
              <Text>{weatherData?.main.sea_level || 'N/A'}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={()=>{navigation.navigate('Location',{ lat: weatherData?.coord.lat,lng: weatherData?.coord.lon})}} style={{backgroundColor: '#fff', marginVertical:50, padding: 15, borderRadius:25, alignItems: 'center'}}>
          <Text style={[globalStyles.h5,{ color:'#222', fontWeight:'700'}]}>Go To Location</Text>
        </TouchableOpacity>
      </View>
      }
    </SafeAreaView>
  )
}