import React, { useEffect, useState } from 'react';
import { Text, View,Pressable,ScrollView } from 'react-native';
import  Icon  from 'react-native-vector-icons/Feather';
import { styles } from './styles';
import { getAllAlarms } from '../../api';
import AlarmView from './components/AlarmView';

export default function Alarm({ navigation }) {
  const [alarms, setAlarms] = useState(null);

  useEffect(() => {
   setAlarms(getAllAlarms());
  }, []);

  return (
    <ScrollView>
      <View style={{flex:1,padding:10}}>
      <View style={styles.row}>
      <Text style={{fontSize:24, fontWeight: 'bold', paddingVertical: 20}}>Alarm</Text>
        <Pressable style={styles.row} onPress={()=>{navigation.navigate('AddAlarm')}}>
          <Icon style={{ paddingHorizontal: 10}} name='refresh-cw' size={25} />
          <Icon name='plus' size={28} />
        </Pressable>
      </View>
        {alarms && alarms.length === 0 && (
          <Text>No alarms</Text>
        )}
        {alarms && alarms.map(a => (

            a.isActive && <AlarmView
              key={a.uid}
              uid={a.uid}
              onChange={async active => {
                if (active) await enableAlarm(a.uid);
                else await disableAlarm(a.uid);
              }}
              title={a.title}
              hour={a.hour}
              minutes={a.minutes}
              days={a.day}
              hourFormat={a.hourFormat}
              setAlarms={setAlarms}
            />

        ))}
        </View>
    </ScrollView>
  );
}