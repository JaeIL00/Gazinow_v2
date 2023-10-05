import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components/native';

import { RootNavigation } from '@/navigation';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <SafeArea>
      <QueryClientProvider client={queryClient}>
        <RootNavigation />
      </QueryClientProvider>
    </SafeArea>
  );
};

export default App;

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;
