import styled from '@emotion/native';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { RootNavigation } from '@/navigation';
import { store } from '@/store';
import { NavigationContainer } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            {Platform.OS === 'android' && <StatusBar />}

            <RootNavigation />
          </NavigationContainer>
        </QueryClientProvider>
      </Provider>
    </KeyboardAvoidingView>
  );
};

export default App;

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;
