import { SubwaySimplePath } from '@/global/components';
import { COLOR } from '@/global/constants';
import { FontText, Toggle } from '@/global/ui';
import { Pressable, SafeAreaView, TouchableOpacity, View } from 'react-native';
import IconLeftArrowHead from '@assets/icons/left_arrow_head.svg';
import IconCrossX from '@assets/icons/cross_x.svg';
import { useMyPageNavigation } from '@/navigation/MyPageNavigation';
import { useRoute } from '@react-navigation/native';
import { MyRoutesType } from '@/global/apis/entity';
import { useState } from 'react';
import cn from 'classname';
import SetNotiTimesBtn from './SetNotiTimesBtn';

const NotiSettingsDetailScreen = () => {
  const myPageNavigation = useMyPageNavigation();
  const { myRoutes } = useRoute().params as { myRoutes: MyRoutesType };
  const [pushNotificationOn, setPushNotificationOn] = useState(false); //FIXME: api 나오면
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const days = ['월', '화', '수', '목', '금', '토', '일'];

  const toggleDay = (day: string) => {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
      } else {
        return [...prevSelectedDays, day];
      }
    });
  };

  //TODO: 토글 기능 추가
  const handlePushNotificationOnToggle = () => {
    setPushNotificationOn(!pushNotificationOn);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between h-56 px-16">
        <TouchableOpacity hitSlop={20} onPress={() => myPageNavigation.goBack()}>
          <IconLeftArrowHead color="#3F3F46" width={24} />
        </TouchableOpacity>
        <FontText
          value={`${myRoutes.roadName} 알림설정`}
          textSize="18px"
          textWeight="Medium"
          lineHeight={23}
        />
        <TouchableOpacity hitSlop={20} onPress={() => myPageNavigation.popToTop()}>
          <IconCrossX />
        </TouchableOpacity>
      </View>

      <View className="flex-1 mt-20 bg-white">
        <View className="mx-50 mb-40">
          <SubwaySimplePath
            pathData={myRoutes.subPaths}
            arriveStationName={myRoutes.lastEndStation}
            betweenPathMargin={24}
          />
        </View>

        <View className="flex-row h-53 px-16 items-center justify-between border-b-1 border-gray-eb">
          <FontText value="푸시 알림 on" textSize="16px" textWeight="Regular" />
          <Toggle isOn={pushNotificationOn} onToggle={handlePushNotificationOnToggle} />
        </View>

        <SetNotiTimesBtn disabled={!pushNotificationOn} />

        <View className="px-16 py-12 border-b-1 border-gray-eb bg-white">
          <FontText
            value="반복 요일"
            textSize="16px"
            textWeight="Regular"
            textColor={pushNotificationOn ? COLOR.BASIC_BLACK : COLOR.GRAY_BE}
          />
          <View className="flex-row pt-16 justify-between">
            {days.map((day) => (
              <Pressable
                key={day}
                className={cn('w-40 h-40 rounded-full items-center justify-center', {
                  'bg-[#49454F]': selectedDays.includes(day),
                  'bg-gray-f2': !selectedDays.includes(day),
                })}
                onPress={() => toggleDay(day)}
                disabled={!pushNotificationOn}
              >
                <FontText
                  value={day}
                  textColor={selectedDays.includes(day) ? 'white' : COLOR.GRAY_999}
                  textSize="16px"
                  textWeight="Medium"
                />
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <TouchableOpacity
        className="h-48 mx-16 mb-50 bg-black-17 rounded-5 items-center justify-center"
        onPress={() => {}} //FIXME: api 나오면
      >
        <FontText value="완료" textSize="17px" textWeight="SemiBold" textColor={COLOR.WHITE} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default NotiSettingsDetailScreen;
