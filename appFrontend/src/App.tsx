import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { RootNavigation } from '@/navigation';
import { store } from '@/store';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import toastConfig from '@global/utils/ToastConfig';

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

export default App;
