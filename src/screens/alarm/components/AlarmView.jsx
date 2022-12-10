import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from '../styles';
import globalStyles  from '../../../styles/globalStyles';
import  Icon  from 'react-native-vector-icons/Feather';
import { deleteAlarm, getAllAlarms } from '../../../api';

export default function ({ uid, title,hour, minutes, days, hourFormat, setAlarms }) {

  return (
    <View key={uid} style={styles.alarmContainer}>
      <View style={styles.row}>
        <View>
        <Text style={globalStyles.h2}>
          {`${hour}:${minutes} ${hourFormat}`}
        </Text>
         <Text style={globalStyles.h4}>
          {title}
          </Text>
        </View>
        { days.length !== 7 && days.map((day) => <Text style={[globalStyles.h5, { color: '#fff' }]}>{day}</Text>)}
        {days.length === 7 && <Text style={[globalStyles.h5, { color: '#fff' }]}>Every Day</Text>}

        <Pressable onPress={() => {
          deleteAlarm(title);
          setAlarms(deleteAlarm(title));
        }}>
          <Icon name='trash-2' size={24} color='red' />
        </Pressable>
      </View>
    </View>
  );
}