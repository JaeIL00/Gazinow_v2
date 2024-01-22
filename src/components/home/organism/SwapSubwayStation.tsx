import styled from '@emotion/native';
import { useLayoutEffect, useState } from 'react';
import { Shadow } from 'react-native-shadow-2';

import { IconButton, TextButton } from '@/components/common/molecules';
import {
  COLOR,
  SEARCH_NAVIGATION,
  SUBWAY_SEARCH,
  ARRIVAL_STATION,
  DEPARTURE_STATION,
  EDIT_ROUTE_NAVIGATION,
} from '@/constants';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { useAppDispatch, useAppSelect } from '@/store';
import { getStationType } from '@/store/modules';
import type { StationDataTypes } from '@/store/modules';

interface SwapProps extends ContainerStyleProps { }

interface InitStationTypes {
  departure: StationDataTypes;
  arrival: StationDataTypes;
}

type StationTypes = typeof DEPARTURE_STATION | typeof ARRIVAL_STATION;

const SwapSubwayStation = ({ isWrap, showHeader }: SwapProps) => {
  const rootNavigation = useRootNavigation();
  const dispatch = useAppDispatch();
  const selectedStation = useAppSelect(({ subwaySearch }) => subwaySearch.selectedStation);

  const [subwayStation, setSubwayStation] = useState<InitStationTypes>(selectedStation);

  const navigateSubwaySearch = (type: StationTypes) => {
    dispatch(getStationType(type));

    const navType = showHeader ? EDIT_ROUTE_NAVIGATION : SEARCH_NAVIGATION;
    rootNavigation.navigate(navType, { screen: SUBWAY_SEARCH });
  };

  const swapStation = () => {
    setSubwayStation(({ departure, arrival }) => ({
      departure: {
        ...arrival,
        name: arrival.name === ARRIVAL_STATION ? DEPARTURE_STATION : arrival.name,
      },
      arrival: {
        ...departure,
        name: departure.name === DEPARTURE_STATION ? ARRIVAL_STATION : departure.name,
      },
    }));
  };

  useLayoutEffect(() => {
    setSubwayStation(selectedStation);
  }, [selectedStation]);

  return (
    <Container
      isWrap={isWrap}
      offset={[0, 4]}
      distance={34}
      startColor="rgba(0,0,0,0.05)"
      disabled={!isWrap}
      showHeader={showHeader}
    >
      <InnerBox>
        <StationButton
          value={subwayStation.departure.name ? subwayStation.departure.name : DEPARTURE_STATION}
          textSize="16px"
          textWeight="Regular"
          lineHeight="21px"
          textColor={subwayStation.departure.name ? COLOR.BASIC_BLACK : COLOR.GRAY_999}
          onPress={() => navigateSubwaySearch(DEPARTURE_STATION)}
        />
        <StationButton
          value={subwayStation.arrival.name ? subwayStation.arrival.name : ARRIVAL_STATION}
          textSize="16px"
          textWeight="Regular"
          lineHeight="21px"
          textColor={subwayStation.arrival.name ? COLOR.BASIC_BLACK : COLOR.GRAY_999}
          onPress={() => navigateSubwaySearch(ARRIVAL_STATION)}
        />
      </InnerBox>
      <IconButton
        isFontIcon={false}
        imagePath="exchange_gray"
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
  showHeader: boolean;
}
const Container = styled(Shadow) <ContainerStyleProps>`
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
  background-color: ${COLOR.LIGHT_GRAY};
  width: 100%;
  height: 41px;
  border-radius: 8px;
  justify-content: center;
  padding-left: 10px;
  padding-right: 15px;
`;
