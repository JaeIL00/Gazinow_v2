import React, { useEffect, useRef, useState } from 'react';
import {
  AppState,
  AppStateStatus,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLOR } from '@/global/constants';
import { FontText } from '@/global/ui';
import IconLeftArrowHead from '@assets/icons/left_arrow_head.svg';
import { useMyPageNavigation } from '@/navigation/MyPageNavigation';
import RequestNotiOn from './RequestNotiOn';
import NotiSettings from './NotiSettings';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const NotiSettingsScreen = () => {
  const myPageNavigation = useMyPageNavigation();

  const [isNotiPermissionOn, setIsNotiPermissionOn] = useState<boolean>(false);

  // const appState = useRef(AppState.currentState);

  const checkNotificationPermission = async () => {
    let result;

    // if (Platform.OS === 'ios') {
    //   result = await check(PERMISSIONS.IOS.);
    // } else {
    result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    // }
    switch (result) {
      case RESULTS.UNAVAILABLE:
        setIsNotiPermissionOn(false);
        break;
      case RESULTS.DENIED:
        setIsNotiPermissionOn(false);
        break;
      case RESULTS.LIMITED:
        setIsNotiPermissionOn(true);
        break;
      case RESULTS.GRANTED:
        setIsNotiPermissionOn(true);
        break;
      case RESULTS.BLOCKED:
        setIsNotiPermissionOn(false);
        break;
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
