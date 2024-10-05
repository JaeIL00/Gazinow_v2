import { FontText, TextButton, Toggle } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useMyPageNavigation } from '@/navigation/MyPageNavigation';
import { useGetSavedRoutesQuery } from '@/global/apis/hooks';
import MoreBtn from '@/assets/icons/moreBtn.svg';
import IconExclamation from '@assets/icons/circle_exclamation_mark.svg';
import { useRootNavigation } from '@/navigation/RootNavigation';

const NotiSettings = () => {
  const myPageNavigation = useMyPageNavigation();
  const rootNavigation = useRootNavigation();
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
      <View className="h-1 bg-gray-eb" />
      <View className="flex-row mx-16 h-53 items-center justify-between">
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
      <View className="h-1 bg-gray-eb" />
      {myRoutes && myRoutes.length > 0 && (
        <>
      <View className="flex-row mx-16 h-72 items-center justify-between">
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
      <View className="h-1 bg-gray-eb" />
        </>
      )}
      {myRoutesNotification && routeDetailSettings && myRoutes && myRoutes.length > 0 && (
      <ScrollView>
          {myRoutes.map((myRoutes, index) => (
            <View key={myRoutes.roadName + index}>
              <TouchableOpacity
                className="flex-row ml-24 mr-16 h-53 items-center justify-between"
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
              <View className="h-1 bg-gray-eb" />
            </View>
          ))}
      </ScrollView>
      )}
      {myRoutesNotification && myRoutes && myRoutes.length < 1 && (
        <View className="mx-16 mt-20 py-16 bg-gray-f9 items-center rounded-12">
          <View className="flex-row items-center">
            <IconExclamation />
            <FontText
              className="pl-5"
              value={'저장한 경로가 아직 없어요'}
              textSize={'14'}
              textWeight={'Regular'}
              textColor="#999999"
            />
          </View>
          <TouchableOpacity>
            <TextButton
              className="mt-8"
              value={'내 경로 저장하고 알림받기'}
              textSize={'13'}
              textWeight={'SemiBold'}
              textColor="#999999"
              onPress={() =>
                rootNavigation.navigate('NewRouteNavigation', { screen: 'SavedRoutes' })
              }
              isTextUnderline
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
export default NotiSettings;
