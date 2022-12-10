import { StyleSheet, Text, View , TextInput, Pressable, ScrollView} from 'react-native'
import React, { useState } from 'react'
import globalStyles from '../../styles/globalStyles';
import SmoothPicker from 'react-native-smooth-picker';
import { addAlarm } from '../../api';

const hour = [
 '1','2','3','4','5','6','7','8','9','0'
];
const minutes = [
'00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
'11','12','13','14','15','16','17','18','19','20',
'21','22','23','24','25','26','27','28','29','30',
'31','32','33','34','35','36','37','38','39','40',
'41','42','43','44','45','46','47','48','49','50',
'51','52','53','54','55','56','57','58','59','60',
];
const hourFormat = ['AM', 'PM'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const opacities = {
  0: 1,
  1: 1,
  2: 0.6,
  3: 0.3,
  4: 0.1,
};
const sizeText = {
  0: 16,
  1: 13,
  2: 10,
};

const Item = React.memo(({ opacity, selected, vertical, fontSize, name }) => {
  return (
    <View
      style={[
        styles.optionWrapper,
        {
          opacity,
        },
      ]}>
      <Text style={{ fontSize }}>{name}</Text>
    </View>
  );
});

const ItemToRender = ({ item, index }, indexSelected, vertical) => {
  const selected = index === indexSelected;
  const gap = Math.abs(index - indexSelected);

  let opacity = opacities[gap];
  if (gap > 3) {
    opacity = opacities[4];
  }
  let fontSize = sizeText[gap];
  if (gap > 1) {
    fontSize = sizeText[2];
  }

  return (
    <Item
      opacity={opacity}
      selected={selected}
      vertical={vertical}
      fontSize={fontSize}
      name={item}
    />
  );
};

export default function AddAlarm({navigation}) {
  const [alarm, setAlarm] = useState({ title: '', hour: '', minutes:'', hourFormat: '', day: [],isActive:true });
  const [selected, setSelected] = React.useState({ hour: 0, minutes: 0, hourFormat: 0 });

  const handleInputChange = (name, value) => {
    setAlarm({ ...alarm, [name]: value });
  }
  const handleTimeChange = (value, index, name) => {
    setAlarm({ ...alarm, [name]: value });
    setSelected({...selected, [name] : index});
  }

  const handleAddAlarm = () => {
    if (!alarm.title || !alarm.hour || !alarm.minutes || !alarm.hourFormat) {
      alert('Please add complete information');
    }
    else {
      addAlarm(alarm);
      navigation.replace('Alarm');
    }
  }
  const handleDaySelect = (day) => {
    const days = [...alarm?.day];
    days.push(day);
    setAlarm({ ...alarm,  day: days });
  }

  return (
    <ScrollView style={{padding:20}}>
      <View style={{backgroundColor: '#222',padding:30,borderRadius:8}}>
        {alarm.hour && alarm.minutes&& alarm.hourFormat && <Text style={[globalStyles.h1,{textAlign: 'center'}]}>{`${alarm.hour}:${alarm.minutes} ${alarm.hourFormat}`}</Text>}
      </View>
    <View style={styles.timePickerContainer}>
      <View style={{flexDirection: 'row'}}>
        <SmoothPicker
          initialScrollToIndex={selected['hour']}
          onScrollToIndexFailed={() => {}}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={hour}
          scrollAnimation
          onSelected={({ item, index }) => handleTimeChange(item,index,'hour')}
          renderItem={(option) => ItemToRender(option, selected, true)}
          magnet
          selectOnPress
          />
          <SmoothPicker
          initialScrollToIndex={selected['minutes']}
          onScrollToIndexFailed={() => {}}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={minutes}
          scrollAnimation
          onSelected={({ item, index }) => handleTimeChange(item, index,'minutes')}
          renderItem={(option) => ItemToRender(option, selected, true)}
          magnet
          selectOnPress
          />
          <SmoothPicker
          initialScrollToIndex={selected['hourFormat']}
          onScrollToIndexFailed={() => {}}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={hourFormat}
          scrollAnimation
          onSelected={({ item, index }) => handleTimeChange(item,index,'hourFormat')}
          renderItem={(option) => ItemToRender(option, selected, true)}
          magnet
          selectOnPress
        />
        </View>
      </View>
      <View style={{backgroundColor: '#222', padding:20, borderRadius:8}}>
        <Text style={[globalStyles.h2,{textAlign: 'center'}]}>Days</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {days.map((day) => (
      <Pressable onPress={()=>handleDaySelect(day)} style={{marginVertical:40,marginLeft:5, backgroundColor: alarm?.day?.includes(day)?'#888':'#222', paddingVertical:30, width:100, borderRadius:5}}>
        <Text style={[globalStyles.h4,{textAlign: 'center'}]}>
          {day}
      </Text>
      </Pressable>
      ))}
      </ScrollView>
      <View style={{flexDirection:'row',alignItems: 'center', marginTop:20}}>
      <Text style={[globalStyles.h5,{color:'#000'}]}>Alarm Name:</Text>
        <TextInput
        onChangeText={(val)=> handleInputChange('title', val)}
        style={{ flex:1,marginLeft:20, border: '1px solid #ddd', padding: 10, borderWidth:2, borderRadius:8 }}
          placeholder='Add Title'
          placeholderTextColor={'#ccc'}
          value={alarm.title} name='title'></TextInput>
      </View>
      <Pressable onPress={handleAddAlarm} style={{marginVertical:20, backgroundColor: '#222', padding:10, borderRadius:30,width:180,alignSelf:'center'}}>
        <Text style={[globalStyles.h3,{textAlign: 'center'}]}>
          Add Alarm
        </Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  timePickerContainer: {
    padding: 10,
    height: 250,
    marginVertical: 10
  },
  optionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
})