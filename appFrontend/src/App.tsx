import React, { useEffect, useCallback, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { RootNavigation } from '@/navigation';
import { store } from '@/store';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import { MODE, SENTRY_DSN } from '@env';
import { version as currentVersion } from '../package.json';
import { fetch } from '@react-native-community/netinfo';
import { Alert, AppState, AppStateStatus, Platform } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import { RootStackParamList } from './navigation/types/navigation';
import notifee from '@notifee/react-native';
import { Walkthrough } from './screens/homeScreen/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleNotificationPress } from './global/utils/pushNotification';
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';

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
    console.log({ MODE });
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

  // 안드로이드 앱 종료 상태일 때 알림 클릭 핸들러
  if (Platform.OS === 'android') {
    const getNotification = useCallback(async () => {
      const remoteMessage = await messaging().getInitialNotification();
      if (remoteMessage) {
        const pathJsonString = remoteMessage?.data?.path;
        await AsyncStorage.setItem('pushNotiParams', pathJsonString as string);
        await handleNotificationPress(remoteMessage);
      }
    }, []);

    useEffect(() => {
      getNotification();

      const handleAppStateChange = (nextAppState: AppStateStatus) => {
        if (nextAppState === 'active') {
          getNotification();
        }
      };

      const subscription = AppState.addEventListener('change', handleAppStateChange);

      return () => {
        subscription.remove();
      };
    }, [getNotification]);
  }
  const routeNameRef = useRef<string | null>(null);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer
          ref={navigationRef}
          onReady={async () => {
            if (!navigationRef.current) return;
            const cur = navigationRef.current.getCurrentRoute();
            if (cur) {
              routeNameRef.current = cur.name;
              await analytics().logScreenView({
                screen_name: cur.name,
                screen_class: cur.name,
              });
            }
          }}
          onStateChange={async () => {
            if (!navigationRef.current) return;
            const previousRouteName = routeNameRef.current;
            const cur = navigationRef.current.getCurrentRoute();
            if (cur && previousRouteName !== cur.name) {
              await analytics().logScreenView({
                screen_name: cur.name,
                screen_class: cur.name,
              });
            }
          }}
        >
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
