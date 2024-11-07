import React, { useState } from 'react';
import { View } from 'react-native';
import DatePicker from 'react-native-date-picker';

interface TimePickerProps {
  setSelectedTime: (time: string) => void;
}

const TimePicker = ({ setSelectedTime }: TimePickerProps) => {
  const [date, setDate] = useState(new Date());

  setSelectedTime(`${date.getHours()}:${date.getMinutes()}`);

  return (
    <View className="border-b-1 border-gray-beb bg-gray-9f9">
      <DatePicker
        className="h-144 my-5 w-full rounded-8 bg-gray-9f9"
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
