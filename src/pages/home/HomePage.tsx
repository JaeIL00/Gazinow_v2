import styled from '@emotion/native';
import { Text } from 'react-native';

import { SwapSubwayStation, SavedRouteIssues } from '@/components/home/organism';

const HomePage = () => {
  return (
    <Container>
      <Text>홈 페이지</Text>
      <SwapSubwayStation isWrap={true} showHeader={false} />
      <SavedRouteIssues />
    </Container>
  );
};

export default HomePage;

const Container = styled.View`
  padding: 0 16px;
  background-color: white;
  flex: 1;
`;
