import { StyleSheet } from 'react-native';

export const colors = {
  GREY: '#d0d5dc',
  BLUE: '#1992fe'
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingVertical: 50
  },
  alarmContainer: {
    backgroundColor: '#222',
    padding: 25,
    marginVertical: 5,
    borderRadius: 8
  },
  row: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between'
  }
});
