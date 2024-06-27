import React, { useState } from 'react';
import { View } from 'react-native';
import DatePicker from 'react-native-date-picker';

interface TimePickerProps {
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

const TimePicker = ({ selectedTime, setSelectedTime }: TimePickerProps) => {
  const [date, setDate] = useState(new Date());

  let hours = date.getHours();
  const period = hours >= 12 ? '오후' : '오전';

  hours = hours % 12;
  hours = hours ? hours : 12;

  if (selectedTime) {
    setSelectedTime(`${period} ${hours}시`);
  }

  return (
    <View className="border-b-1 border-gray-eb bg-gray-f9">
      <DatePicker
        className="h-144 my-5 w-full rounded-8 bg-gray-f9"
        date={date}
        onDateChange={setDate}
        locale="ko-KR"
        mode="time"
        minuteInterval={5}
        androidVariant="iosClone"
        theme="light"
        fadeToColor="#F9F9F9"
      />
    </View>
  );
};

export default TimePicker;
