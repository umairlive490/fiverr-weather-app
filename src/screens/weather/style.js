import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  panelFill: {
    marginTop: 30,
    width: '100%',
    zIndex: 1,
    position: 'absolute',
  },
   searchBar: {
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 40,
  },
  locationName: {
    textAlign: 'center',
     color: 'yellow',
     fontWeight: '800'
  },
  weatherContainer: {
    flex: 1,
    padding: 20,
    paddingVertical: 50,
  }
});
