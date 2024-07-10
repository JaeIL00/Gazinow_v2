import { FontText, TextButton, Toggle } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useMyPageNavigation } from '@/navigation/MyPageNavigation';
import { useGetSavedRoutesQuery } from '@/global/apis/hooks';
import MoreBtn from '@/assets/icons/moreBtn.svg';

const NotiSettings = () => {
  const myPageNavigation = useMyPageNavigation();
  const [pushNotificationOn, setPushNotificationOn] = useState<boolean>(false);
  const [myRoutesNotification, setMyRoutesNotification] = useState<boolean>(false);
  const [routeDetailSettings, setRouteDetailSettings] = useState<boolean>(false);

  const { data: myRoutes } = useGetSavedRoutesQuery();

  useEffect(() => {
    if (!pushNotificationOn) {
      setMyRoutesNotification(false);
      setRouteDetailSettings(false);
    } else {
      setMyRoutesNotification(true);
      setRouteDetailSettings(true);
    }
  }, [pushNotificationOn]);

  useEffect(() => {
    if (!myRoutesNotification) {
      setRouteDetailSettings(false);
    } else {
      setRouteDetailSettings(true);
    }
  }, [myRoutesNotification]);

  return (
    <>
      <View className="h-1 mx-[-16px] bg-gray-eb" />
      <View className="flex-row h-53 items-center justify-between">
        <TextButton value="푸시 알림 받기" textSize="16px" textWeight="SemiBold" />
        <Toggle
          isOn={pushNotificationOn}
          onToggle={() => setPushNotificationOn(!pushNotificationOn)}
        />
      </View>
      <View className="h-20 bg-gray-f9" />
      <View className="flex-row mx-16 h-53 items-center justify-between">
        <TextButton
          value="내가 저장한 경로 알림"
          textSize="16px"
          textWeight="SemiBold"
          textColor={pushNotificationOn ? COLOR.BASIC_BLACK : COLOR.GRAY_BE}
        />
        <Toggle
          isOn={myRoutesNotification}
          onToggle={() => setMyRoutesNotification(!myRoutesNotification)}
          disabled={!pushNotificationOn}
        />
      </View>
      <View className="h-1 mx-[-16px] bg-gray-eb" />
      <View className="flex-row h-72 items-center justify-between">
        <View className="gap-6">
          <TextButton
            value="경로 상세 설정"
            textSize="16px"
            textWeight="SemiBold"
            textColor={
              pushNotificationOn && myRoutesNotification ? COLOR.BASIC_BLACK : COLOR.GRAY_BE
            }
          />
          <TextButton
            value="개별 경로의 알림이 활성화되는 시간을 설정해요"
            textSize="12px"
            textWeight="Regular"
            lineHeight={14}
            textColor={
              pushNotificationOn && myRoutesNotification ? COLOR.BASIC_BLACK : COLOR.GRAY_BE
            }
          />
        </View>
        <Toggle
          isOn={routeDetailSettings}
          onToggle={() => setRouteDetailSettings(!routeDetailSettings)}
          disabled={!pushNotificationOn}
        />
      </View>
      <View className="h-1 mx-[-16px] bg-gray-eb" />
      {routeDetailSettings &&
        myRoutes?.map((myRoutes, index) => (
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
    </>
  );
};
export default NotiSettings;
