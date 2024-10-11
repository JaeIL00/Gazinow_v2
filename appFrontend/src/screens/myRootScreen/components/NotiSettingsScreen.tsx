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

  const checkNotificationPermission = async () => {
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus) {
      setIsNotiPermissionOn(true);
    } else {
      setIsNotiPermissionOn(false);
    }
  };

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
  }, []);

  const submitNotificationSettings = () => {};

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-16">
        <TouchableOpacity
          className="flex-row items-center py-16"
          onPress={() => myPageNavigation.goBack()}
        >
          <IconLeftArrowHead color="#3F3F46" className="ml-6 mr-21" />
          <FontText text="알림 설정" className="text-18 leading-23" fontWeight="500" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => submitNotificationSettings()}>
          <FontText text="완료" className="text-gray-999" fontWeight="600" />
        </TouchableOpacity>
      </View>
      {isNotiPermissionOn ? <NotiSettings /> : <RequestNotiOn />}
    </SafeAreaView>
  );
};

export default NotiSettingsScreen;
