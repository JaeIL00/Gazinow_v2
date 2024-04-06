import styled from '@emotion/native';
import { TextButton } from '@/global/ui';
import { COLOR, ARRIVAL_STATION, DEPARTURE_STATION } from '@/global/constants';
import { useAppDispatch, useAppSelect } from '@/store';
import { getSeletedStation, getStationType, initialize } from '@/store/modules';
import type { StationDataTypes } from '@/store/modules';
import IconSwapChange from '@assets/icons/swap_change.svg';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import AddNewRouteHeader from './AddNewRouteHeader';
import { useNewRouteNavigation } from '@/navigation/NewRouteNavigation';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import React from 'react';

export interface SelectedStationTypes {
  departure: StationDataTypes;
  arrival: StationDataTypes;
}
interface SwapStationProps {
  setSelectedStation: React.Dispatch<React.SetStateAction<SelectedStationTypes>>;
}

type StationTypes = typeof DEPARTURE_STATION | typeof ARRIVAL_STATION;

const SwapStation = ({ setSelectedStation }: SwapStationProps) => {
  const route = useRoute();
  const newRouteNavigation = useNewRouteNavigation();
  const dispatch = useAppDispatch();
  const selectedStation = useAppSelect((state) => state.subwaySearch.selectedStation);

  const navigateSearchStation = (type: StationTypes) => {
    dispatch(getStationType(type));
    newRouteNavigation.navigate('Search');
  };

  useFocusEffect(() => {
    if (
      selectedStation.arrival.stationName &&
      selectedStation.departure.stationName &&
      route.name === 'Swap'
    ) {
      dispatch(initialize());
    }
  });

  const swapStation = () => {
    dispatch(
      getSeletedStation({
        arrival: selectedStation.departure,
        departure: selectedStation.arrival,
      }),
    );
    setSelectedStation(({ departure, arrival }) => ({
      departure: {
        ...arrival,
      },
      arrival: {
        ...departure,
      },
    }));
  };

  return (
    <>
      <SafeAreaView style={route.name === 'Swap' ? { flex: 1, backgroundColor: COLOR.WHITE } : {}}>
        <AddNewRouteHeader />
        <Container>
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
          <TouchableOpacity onPress={swapStation}>
            <IconSwapChange />
          </TouchableOpacity>
        </Container>
      </SafeAreaView>
    </>
  );
};

export default SwapStation;

const Container = styled.View`
  padding: 20px 16px 45px;
  background-color: ${COLOR.WHITE};
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
