import styled from '@emotion/native';
import { Text } from 'react-native';

import { SwapSubwayStation } from '@/components/common';
import { SEARCH_NAVIGATION, SUBWAY_SEARCH, WHITE } from '@/constants';
import { useRootNavigation } from '@/navigation/RootNavigation';

const HomePage = () => {
  const rootNavigation = useRootNavigation();

  const navigateSubwaySearch = () => {
    rootNavigation.push(SEARCH_NAVIGATION, { screen: SUBWAY_SEARCH });
  };

  return (
    <Container>
      <Text>홈 페이지</Text>
      <SwapStationBox>
        <SwapSubwayStation onPress={navigateSubwaySearch} />
      </SwapStationBox>
    </Container>
  );
};

export default HomePage;

const Container = styled.View`
  padding: 0 16px;
`;
const SwapStationBox = styled.View`
  padding: 19px 17px 21px 14px;
  background-color: ${WHITE};
  border-radius: 14px;
`;
