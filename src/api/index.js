 let alarms = [
    {
    title: 'Alarm1',
    hour: '12',
    minutes: '30',
    hourFormat:'AM',
    day: ['Sunday'],
    isActive: true
    },
    {
    title: 'Alarm2',
    hour: '02',
    hourFormat:'PM',
    minutes:'30',
    day: ['Mon'],
    isActive: true
    },
   {
    title: 'Alarm3',
    hourFormat:'PM',
    hour: '01',
    minutes:'30',
    day: ['Tue'],
    isActive: true
  }
  ]

export const getLocationWeatherData = async (lat, lng) => {
  const OPEN_WEATHER_KEY = '61cda565fe78ccb9d9415a22c0eeae91';
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPEN_WEATHER_KEY}&units=metric`)
  const data = await response.json();
  return data;
}

export const getAllAlarms = () => {
 return alarms.filter((alarm) => alarm.isActive);
}
export const addAlarm = (newAlarm) => {
  alarms.push(newAlarm);
}
export const deleteAlarm = (title) => {
  const alarm = alarms.find((alarm) => alarm.title === title);
  const updatedArray = alarms.filter((alarm) => alarm.title !== title);

  const updatedAlarm = { ...alarm, isActive: false };
  const list = [...updatedArray, updatedAlarm];
  alarms = list;
  return list;
};
