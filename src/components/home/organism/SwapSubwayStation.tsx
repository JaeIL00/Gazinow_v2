import styled from '@emotion/native';
import { useState } from 'react';
import { Shadow } from 'react-native-shadow-2';

import { IconButton, TextButton } from '@/components/common/molecules';
import { COLOR, SEARCH_NAVIGATION, SUBWAY_SEARCH } from '@/constants';
import { useRootNavigation } from '@/navigation/RootNavigation';

interface SwapProps extends ContainerStyleProps {}

const initStation = {
  departure: '출발역',
  arrival: '도착역',
};

const SwapSubwayStation = ({ isWrap }: SwapProps) => {
  const rootNavigation = useRootNavigation();

  const [subwayStation, setSubwayStation] = useState<typeof initStation>(initStation);

  const navigateSubwaySearch = (type: 'departure' | 'arrival') => {
    rootNavigation.navigate(SEARCH_NAVIGATION, { screen: SUBWAY_SEARCH, where: type });
  };

  const swapStation = () => {
    setSubwayStation(({ departure, arrival }) => ({
      departure: arrival,
      arrival: departure,
    }));
  };

  return (
    <Container isWrap={isWrap} offset={[0, 4]} distance={34} startColor="rgba(0, 0, 0, 0.05)">
      <InnerBox>
        <StationButton
          value={subwayStation.departure}
          textSize="16px"
          textWeight="Regular"
          lineHeight="21px"
          onPress={() => navigateSubwaySearch('departure')}
        />
        <StationButton
          value={subwayStation.arrival}
          textSize="16px"
          textWeight="Regular"
          lineHeight="21px"
          onPress={() => navigateSubwaySearch('arrival')}
        />
      </InnerBox>
      <IconButton
        isFontIcon={false}
        iconName="exchange_gray"
        iconWidth="20px"
        iconHeight="20px"
        onPress={swapStation}
      />
    </Container>
  );
};

export default SwapSubwayStation;

interface ContainerStyleProps {
  isWrap: boolean;
}
const Container = styled(Shadow)<ContainerStyleProps>`
  ${({ isWrap }) =>
    isWrap &&
    `
      padding: 19px 17px 21px 14px;
  	  background-color: ${COLOR.WHITE};
  	  border-radius: 14px;
  `}
  flex-direction: row;
  align-items: center;
`;
const InnerBox = styled.View`
  flex: 1;
  margin-right: 15px;
  gap: 8px;
`;
const StationButton = styled(TextButton)`
  background-color: ${COLOR.BG_LIGHT_GRAY};
  width: 100%;
  height: 41px;
  border-radius: 8px;
  justify-content: center;
  padding-left: 10px;
  padding-right: 15px;
`;
