import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import CodePush from 'react-native-code-push';

import { RootNavigation } from '@/navigation';
import { store } from '@/store';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import toastConfig from '@global/utils/ToastConfig';
import * as Sentry from '@sentry/react-native';
import { MODE, SENTRY_DSN } from '@env';
import { version as currentVersion } from '../package.json';

Sentry.init({
  enabled: MODE === 'production',
  dsn: SENTRY_DSN,
  release: currentVersion,
  tracesSampleRate: 1.0,
});

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootNavigation />
          <Toast config={toastConfig} />
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
};

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  // updateDialog: {
  //   title: '버전 업데이트 안내',
  //   optionalUpdateMessage: '최신 버전이 업로드 됐습니다.',
  //   optionalInstallButtonLabel: '예',
  //   optionalIgnoreButtonLabel: '아니요.',
  // },
  installMode: CodePush.InstallMode.ON_NEXT_RESUME,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
};

export default CodePush(codePushOptions)(Sentry.wrap(App));
