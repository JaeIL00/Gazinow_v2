import styled from '@emotion/native';
import { Text } from 'react-native';
import { SavedRouteIssues, SwapStation } from './components';

const HomeScreen = () => {
  return (
    <Container>
      <Text>홈 페이지</Text>
      <SwapStation isSavingNewRoute={false}/>
      {/* <SwapSubwayStation isWrap={true} showHeader={false} /> */}
      <SavedRouteIssues />
    </Container>
  );
};

export default HomeScreen;

const Container = styled.ScrollView`
  padding: 0 16px;
  flex: 1;
`;
