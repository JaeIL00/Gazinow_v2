import { FontText } from '@/global/ui';
import { Animated, Easing, Pressable, View } from 'react-native';
import { useEffect, useState } from 'react';
import TimePicker from '@/global/ui/TimePicker';
import { COLOR } from '@/global/constants';

interface SetNotiTimesBtnProps {
  disabled: boolean;
}

const SetNotiTimesBtn = ({ disabled }: SetNotiTimesBtnProps) => {
  const [selectedStartTime, setSelectedStartTime] = useState<string>('오전 7시'); //FIXME: api 나오면
  const [selectedEndTime, setSelectedEndTime] = useState<string>('오전 9시'); //FIXME: api 나오면

  const [whichTimePickerIsOpened, setWhichTimePickerIsOpened] = useState<'start' | 'end' | null>(
    null,
  );

  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    let toValue = 0;
    if (whichTimePickerIsOpened === 'start') toValue = 1;
    else if (whichTimePickerIsOpened === 'end') toValue = 2;

    Animated.timing(animatedValue, {
      toValue,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [whichTimePickerIsOpened]);

  const translateYStart = animatedValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [-10, 0, 53],
  });

  const translateYEnd = animatedValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [-10, -10, 0],
  });

  return (
    <>
      <View className="flex-row h-53 px-16 items-center justify-between border-b-1 border-gray-eb">
        <FontText
          value="시작 시간"
          textSize="16px"
          textWeight="Regular"
          textColor={disabled ? COLOR.GRAY_BE : COLOR.BASIC_BLACK}
        />
        <Pressable
          className="w-76 h-36 rounded-8 bg-gray-eb items-center justify-center"
          onPress={() => {
            if (whichTimePickerIsOpened === 'start') {
              setWhichTimePickerIsOpened(null);
            } else {
              setWhichTimePickerIsOpened('start');
            }
          }}
          disabled={disabled}
        >
          <FontText
            value={selectedStartTime}
            textColor={disabled ? COLOR.GRAY_BE : '#346BF7'}
            textSize="16px"
            textWeight="Regular"
          />
        </Pressable>
      </View>

      {!disabled && whichTimePickerIsOpened === 'start' && (
        <Animated.View style={{ transform: [{ translateY: translateYStart }] }}>
          <TimePicker selectedTime={selectedStartTime} setSelectedTime={setSelectedStartTime} />
        </Animated.View>
      )}

      <View className="flex-row h-53 px-16 items-center justify-between border-b-1 border-gray-eb">
        <FontText
          value="종료 시간"
          textSize="16px"
          textWeight="Regular"
          textColor={disabled ? COLOR.GRAY_BE : COLOR.BASIC_BLACK}
        />
        <Pressable
          className="w-76 h-36 rounded-8 bg-gray-eb items-center justify-center"
          onPress={() => {
            if (whichTimePickerIsOpened === 'end') {
              setWhichTimePickerIsOpened(null);
            } else {
              setWhichTimePickerIsOpened('end');
            }
          }}
          disabled={disabled}
        >
          <FontText
            value={selectedEndTime}
            textColor={disabled ? COLOR.GRAY_BE : '#346BF7'}
            textSize="16px"
            textWeight="Regular"
          />
        </Pressable>
      </View>

      {!disabled && whichTimePickerIsOpened === 'end' && (
        <Animated.View style={{ transform: [{ translateY: translateYEnd }] }}>
          <TimePicker selectedTime={selectedEndTime} setSelectedTime={setSelectedEndTime} />
        </Animated.View>
      )}
    </>
  );
};

export default SetNotiTimesBtn;
