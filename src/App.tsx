import styled from '@emotion/native';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { RootNavigation } from '@/navigation';
import { store } from '@/store';
import { NavigationContainer } from '@react-navigation/native';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <SafeArea>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </QueryClientProvider>
      </Provider>
    </SafeArea>
  );
};

export default App;

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;
