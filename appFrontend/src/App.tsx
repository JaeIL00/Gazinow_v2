import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { RootNavigation } from '@/navigation';
import { store } from '@/store';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import { MODE, SENTRY_DSN } from '@env';
import { version as currentVersion } from '../package.json';
import { fetch } from '@react-native-community/netinfo';
import { Alert } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import { RootStackParamList } from './navigation/types/navigation';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  EventDetail,
  EventType,
} from '@notifee/react-native';
import { Walkthrough } from './screens/homeScreen/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

Sentry.init({
  enabled: MODE === 'production',
  dsn: SENTRY_DSN,
  release: currentVersion,
  tracesSampleRate: 1.0,
});

const queryClient = new QueryClient();

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const App = (): JSX.Element => {
  // 앱 진입 시 네트워크 확인
  useEffect(() => {
    const checkNetworkAndRetry = async () => {
      const state = await fetch();
      if (!state.isConnected) {
        Alert.alert('', '네트워크 환경이 좋지 않습니다.\n잠시후 다시 시도해주세요.', [
          {
            text: '종료',
            onPress: () => {
              RNExitApp.exitApp();
            },
            style: 'default',
          },
          {
            text: '다시시도',
            onPress: () => {
              checkNetworkAndRetry();
            },
            style: 'cancel',
          },
        ]);
      }
    };
    checkNetworkAndRetry();
  }, []);

  // 워크스루를 위한 첫 실행 여부 확인
  const [isFirstRun, setIsFirstRun] = useState<boolean>(false);
  useEffect(() => {
    const checkFirstRun = async () => {
      try {
        const hasRun = await AsyncStorage.getItem('hasRun');
        if (hasRun === null) {
          await AsyncStorage.setItem('hasRun', 'true');
          setIsFirstRun(true);
        } else {
          setIsFirstRun(false);
        }
      } catch (error) {
        console.error('Error checking first run', error);
      }
    };

    checkFirstRun();
  }, []);

  // 워크스루 종료 시 알림 권한 요청
  const [isWalkthroughClosed, setIsWalkthroughClosed] = useState<boolean>(false);
  useEffect(() => {
    if (isWalkthroughClosed) {
      const requestPermission = async () => {
        await notifee.requestPermission();
      };

      requestPermission();
    }
  }, [isWalkthroughClosed]);

  // 포그라운드 알림 수신
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      onMessageReceived(remoteMessage);
    });
    return unsubscribe;
  }, []);

  // 백그라운드 알림 수신 및 표시
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {});

  // 포그라운드 알림 화면에 표시
  const onMessageReceived = async (message: FirebaseMessagingTypes.RemoteMessage) => {
    const { title, body } = message.notification!;

    // 채널 생성
    const channelId = await notifee.createChannel({
      // Miscellaneous 채널 삭제, Important Notifications로 통임
      id: 'fcm_fallback_notification_channel',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
    });

    // 디바이스에 알림 표시
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        timeoutAfter: 2000,
      },
    });
  };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer ref={navigationRef}>
          <RootNavigation />
          {isFirstRun && !isWalkthroughClosed && (
            <Walkthrough setIsWalkthroughClosed={setIsWalkthroughClosed} />
          )}
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
};

export default Sentry.wrap(App);
