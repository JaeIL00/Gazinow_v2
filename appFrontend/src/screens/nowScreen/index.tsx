import React, { useEffect, useState } from 'react';
import styled from '@emotion/native';
import { COLOR } from '@/global/constants';
import { useQueryClient } from 'react-query';
import { PopularIssues } from './components';

const NowScreen = () => {
  const queryClient = useQueryClient();
  const [activeButton, setActiveButton] = useState<string>('전체');

  useEffect(() => {
    queryClient.invalidateQueries('getAllIssues');
    queryClient.invalidateQueries('getPopularIssues');
  }, [activeButton]);

  return (
    <Container>
      <PopularIssues activeButton={activeButton} setActiveButton={setActiveButton} />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${COLOR.WHITE};
  flex: 1;
`;

export default NowScreen;
