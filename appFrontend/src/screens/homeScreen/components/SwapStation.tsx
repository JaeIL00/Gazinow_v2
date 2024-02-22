import styled from '@emotion/native';
import { Shadow } from 'react-native-shadow-2';

import { TextButton } from '@/global/ui';
import { COLOR, ARRIVAL_STATION, DEPARTURE_STATION } from '@/global/constants';
import { useAppDispatch, useAppSelect } from '@/store';
import { getStationType, initialize, swapStation } from '@/store/modules';
import type { StationDataTypes } from '@/store/modules';
import { TouchableOpacity } from 'react-native';
import IconSwapChange from '@assets/icons/swap_change.svg';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { useFocusEffect } from '@react-navigation/native';

export interface SelectedStationTypes {
  departure: StationDataTypes;
  arrival: StationDataTypes;
}

type StationTypes = typeof DEPARTURE_STATION | typeof ARRIVAL_STATION;

const SwapStation = () => {
  const navigation = useRootNavigation();
  const dispatch = useAppDispatch();
  const selectedStation = useAppSelect((state) => state.subwaySearch.selectedStation);

  const navigateSearchStation = (type: StationTypes) => {
    dispatch(getStationType(type));
    navigation.navigate('IssueStack', { screen: 'SearchStation' });
  };

  useFocusEffect(() => {
    if (selectedStation.arrival.stationName && selectedStation.departure.stationName) {
      dispatch(initialize());
    }
  });

  return (
    <Container offset={[0, 4]} distance={34} startColor="rgba(0,0,0,0.05)">
      <InnerBox>
        <StationButton
          value={
            selectedStation.departure.stationName
              ? selectedStation.departure.stationName
              : DEPARTURE_STATION
          }
          textSize="16px"
          textWeight="Regular"
          lineHeight="21px"
          textColor={selectedStation.departure.stationName ? COLOR.BASIC_BLACK : COLOR.GRAY_999}
          onPress={() => navigateSearchStation(DEPARTURE_STATION)}
        />
        <StationButton
          value={
            selectedStation.arrival.stationName
              ? selectedStation.arrival.stationName
              : ARRIVAL_STATION
          }
          textSize="16px"
          textWeight="Regular"
          lineHeight="21px"
          textColor={selectedStation.arrival.stationName ? COLOR.BASIC_BLACK : COLOR.GRAY_999}
          onPress={() => navigateSearchStation(ARRIVAL_STATION)}
        />
      </InnerBox>
      <TouchableOpacity onPress={() => dispatch(swapStation(selectedStation))}>
        <IconSwapChange />
      </TouchableOpacity>
    </Container>
  );
};

export default SwapStation;

const Container = styled(Shadow)`
  padding: 19px 17px 21px 14px;
  background-color: ${COLOR.WHITE};
  border-radius: 14px;
  flex-direction: row;
  align-items: center;
`;
const InnerBox = styled.View`
  flex: 1;
  margin-right: 15px;
  gap: 8px;
`;
const StationButton = styled(TextButton)`
  background-color: ${COLOR.GRAY_F9};
  width: 100%;
  height: 41px;
  border-radius: 8px;
  justify-content: center;
  padding-left: 10px;
  padding-right: 15px;
`;
