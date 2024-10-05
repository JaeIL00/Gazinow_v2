import React, { useEffect, useState } from 'react';
import { AppState, AppStateStatus, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { COLOR } from '@/global/constants';
import { FontText } from '@/global/ui';
import IconLeftArrowHead from '@assets/icons/left_arrow_head.svg';
import { useMyPageNavigation } from '@/navigation/MyPageNavigation';
import RequestNotiOn from './RequestNotiOn';
import NotiSettings from './NotiSettings';
import notifee from '@notifee/react-native';

const NotiSettingsScreen = () => {
  const myPageNavigation = useMyPageNavigation();
  const [isNotiPermissionOn, setIsNotiPermissionOn] = useState<boolean>(false);

  const checkNotificationPermission = useCallback(async () => {
    const settings = await notifee.getNotificationSettings();
    setIsNotiPermissionOn(settings.authorizationStatus >= 1);
  }, []);

  useEffect(() => {
    checkNotificationPermission();

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        checkNotificationPermission();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [checkNotificationPermission]);

  const submitNotificationSettings = () => {};

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row px-16 items-center justify-between">
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
      {isNotiPermissionOn ? <NotiSettings /> : <RequestNotiOn />}
    </SafeAreaView>
  );
};

export default NotiSettingsScreen;
