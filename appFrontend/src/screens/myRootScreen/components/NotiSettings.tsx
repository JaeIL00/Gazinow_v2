import { FontText, Toggle } from '@/global/ui';
import cn from 'classname';
import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useMyPageNavigation } from '@/navigation/MyPageNavigation';
import { useGetSavedRoutesQuery } from '@/global/apis/hooks';
import MoreBtn from '@/assets/icons/moreBtn.svg';

const NotiSettings = () => {
  const myPageNavigation = useMyPageNavigation();
  const [pushNotificationOn, setPushNotificationOn] = useState<boolean>(false);
  const [myRoutesNotification, setMyRoutesNotification] = useState<boolean>(false);
  const [routeDetailSettings, setRouteDetailSettings] = useState<boolean>(false);

  const { myRoutes } = useGetSavedRoutesQuery();

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
      <View className="h-1 bg-gray-beb" />
      <View className="flex-row items-center justify-between mx-16 h-53">
        <FontText text="푸시 알림 받기" fontWeight="600" />
        <Toggle
          isOn={pushNotificationOn}
          onToggle={() => setPushNotificationOn(!pushNotificationOn)}
        />
      </View>
      <View className="h-20 bg-gray-9f9" />
      <View className="flex-row items-center justify-between mx-16 h-53">
        <FontText
          text="내가 저장한 경로 알림"
          className={cn({
            'text-gray-ebe': !pushNotificationOn,
          })}
          fontWeight="600"
        />
        <Toggle
          isOn={myRoutesNotification}
          onToggle={() => setMyRoutesNotification(!myRoutesNotification)}
          disabled={!pushNotificationOn}
        />
      </View>
      <View className="h-1 bg-gray-beb" />
      <View className="flex-row items-center justify-between mx-16 h-72">
        <View className="gap-6">
          <FontText
            text="경로 상세 설정"
            className={cn({
              'text-gray-ebe': !(pushNotificationOn && myRoutesNotification),
            })}
            fontWeight="600"
          />
          <FontText
            text="개별 경로의 알림이 활성화되는 시간을 설정해요"
            className={cn('text-12 leading-14', {
              'text-gray-ebe': !(pushNotificationOn && myRoutesNotification),
            })}
            fontWeight="600"
          />
        </View>
        <Toggle
          isOn={routeDetailSettings}
          onToggle={() => setRouteDetailSettings(!routeDetailSettings)}
          disabled={!pushNotificationOn}
        />
      </View>
      <View className="h-1 bg-gray-beb" />
      <ScrollView>
        {routeDetailSettings &&
          myRoutes?.map((myRoutes, index) => (
            <View key={myRoutes.roadName + index}>
              <TouchableOpacity
                className="flex-row items-center justify-between ml-24 mr-16 h-53"
                onPress={() => myPageNavigation.push('NotiSettingsDetailScreen', { myRoutes })}
              >
                <FontText text={myRoutes.roadName} className="text-gray-999" fontWeight="500" />
                <View className="flex-row items-center">
                  <FontText text="편집" className="text-gray-999 text-13 leading-19" />
                  <MoreBtn height={19} className="ml-4" />
                </View>
              </TouchableOpacity>
              <View className="h-1 bg-gray-beb" />
            </View>
          ))}
      </ScrollView>
    </>
  );
};
export default NotiSettings;
