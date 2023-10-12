import styled from '@emotion/native';
import { Text } from 'react-native';

import { SwapSubwayStation } from '@/components/home/organism';

const HomePage = () => {
  return (
    <Container>
      <Text>홈 페이지</Text>
      <SwapSubwayStation isWrap={true} />
    </Container>
  );
};

export default HomePage;

const Container = styled.View`
  padding: 0 16px;
`;
