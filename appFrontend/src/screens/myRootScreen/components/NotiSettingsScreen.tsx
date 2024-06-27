import { FontText, TextButton, Toggle } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import IconLeftArrowHead from '@assets/icons/left_arrow_head.svg';
import { useMyPageNavigation } from '@/navigation/MyPageNavigation';
import { useGetSavedRoutesQuery } from '@/global/apis/hooks';
import MoreBtn from '@/assets/icons/moreBtn.svg';

const NotiSettingsScreen = () => {
  const myPageNavigation = useMyPageNavigation();
  const [pushNotificationOn, setPushNotificationOn] = useState(false);
  const [savedPathNotification, setSavedPathNotification] = useState(true);

  const handlePushNotificationOnToggle = () => {
    setPushNotificationOn(!pushNotificationOn);
  };

  const submitNotificationSettings = () => {};

  const { data: myRoutes } = useGetSavedRoutesQuery();

  return (
    <SafeAreaView className="flex-1 bg-white px-16">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          className="flex-row items-center py-16"
          onPress={() => myPageNavigation.goBack()}
        >
          <IconLeftArrowHead color="#3F3F46" className="ml-6 mr-21" />
          <FontText value="알림 설정" textSize="18px" lineHeight={23} textWeight="Medium" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => submitNotificationSettings()}>
          <FontText value="완료" textSize="16px" textColor={COLOR.GRAY_999} textWeight="SemiBold" />
        </TouchableOpacity>
      </View>

      <View className="h-1 mx-[-16px] bg-gray-eb" />

      <View>
        <View className="flex-row h-53 items-center justify-between">
          <TextButton value="푸시 알림 받기" textSize="16px" textWeight="SemiBold" />
          <Toggle isOn={pushNotificationOn} onToggle={handlePushNotificationOnToggle} />
        </View>
        <View className="h-20 mx-[-16px] bg-gray-f9" />
        <View className="flex-row h-53 items-center justify-between">
          <TextButton value="내가 저장한 경로 알림" textSize="16px" textWeight="SemiBold" />
          <Toggle
            isOn={pushNotificationOn}
            onToggle={() => setSavedPathNotification(!savedPathNotification)}
            disabled={!pushNotificationOn}
          />
        </View>
        <View className="h-1 mx-[-16px] bg-gray-eb" />
        <View className="flex-row h-72 items-center justify-between">
          <View className="gap-6">
            <TextButton value="경로 상세 설정" textSize="16px" textWeight="SemiBold" />
            <TextButton
              value="개별 경로의 알림이 활성화되는 시간을 설정해요"
              textSize="12px"
              textWeight="Regular"
              lineHeight={14}
            />
          </View>
          <Toggle
            isOn={pushNotificationOn}
            onToggle={handlePushNotificationOnToggle}
            disabled={!pushNotificationOn}
          />
        </View>
        <View className="h-1 mx-[-16px] bg-gray-eb" />
        {myRoutes?.map((myRoutes, index) => (
          <View key={myRoutes.roadName + index}>
            <TouchableOpacity
              className="flex-row h-53 ml-8 items-center justify-between"
              onPress={() => myPageNavigation.push('NotiSettingsDetailScreen', { myRoutes })}
            >
              <FontText
                value={myRoutes.roadName}
                textColor={COLOR.GRAY_999}
                textSize="16px"
                textWeight="Medium"
              />
              <View className="flex-row items-center">
                <FontText
                  value="편집"
                  textColor={COLOR.GRAY_999}
                  textSize="13px"
                  textWeight="Regular"
                  lineHeight={19}
                />
                <MoreBtn height={19} className="ml-4" />
              </View>
            </TouchableOpacity>
            <View className="h-1 mx-[-16px] bg-gray-eb" />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};
export default NotiSettingsScreen;
