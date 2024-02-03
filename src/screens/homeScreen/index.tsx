import styled from '@emotion/native';
import { ScrollView, Text } from 'react-native';
import { SavedRouteIssues } from './components';
import { SwapSubwayStation } from '@/global/components';

const HomeScreen = () => {
  return (
    <Container>
      <ScrollView>
        <Text>홈 페이지</Text>
        <SwapSubwayStation isWrap={true} showHeader={false} />
        <SavedRouteIssues />
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;

const Container = styled.View`
  padding: 0 16px;
  // background-color: white;
  flex: 1;
`;
