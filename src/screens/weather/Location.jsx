import { StyleSheet,Dimensions } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps';

export default function Location(props) {
  const { lat, lng } = props.route.params || {};

  return (
     <MapView
      provider='google'
      showsUserLocation={true}
      style={styles.map}
      region={{
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0111,
        longitudeDelta: 0.0111,
      }}>
          <Marker
            coordinate={{
              latitude: lat,
              longitude: lng,
            }}>
          </Marker>
    </MapView>
  )
}

const styles = StyleSheet.create({
    map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})