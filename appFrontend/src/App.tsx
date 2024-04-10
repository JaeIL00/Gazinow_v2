import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { RootNavigation } from '@/navigation';
import { store } from '@/store';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import toastConfig from '@global/utils/ToastConfig';
import * as Sentry from '@sentry/react-native';
import { MODE, SENTRY_DSN } from '@env';
import { version as currentVersion } from '../package.json';
import { fetch } from '@react-native-community/netinfo';
import { Alert } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import { RootStackParamList } from './navigation/types/navigation';

Sentry.init({
  enabled: MODE === 'production',
  dsn: SENTRY_DSN,
  release: currentVersion,
  tracesSampleRate: 1.0,
});

const queryClient = new QueryClient();

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const App = (): JSX.Element => {
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

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer ref={navigationRef}>
          <RootNavigation />
          <Toast config={toastConfig} />
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
};

export default Sentry.wrap(App);
