import styled from '@emotion/native';
import { TextButton } from '@/global/ui';
import { COLOR, ARRIVAL_STATION, DEPARTURE_STATION } from '@/global/constants';
import { useAppDispatch } from '@/store';
import { getSeletedStation, getStationType } from '@/store/modules';
import { TouchableOpacity, View } from 'react-native';
import IconSwapChange from '@assets/icons/swap_change.svg';
import { SelectedStationTypes } from './NewSearchSwapStation';
import { useNewRouteNavigation } from '@/navigation/NewRouteNavigation';

interface SwapStationProps {
  selectedStation: SelectedStationTypes;
  setSelectedStation: React.Dispatch<React.SetStateAction<SelectedStationTypes>>;
}

const SwapStation = ({ selectedStation, setSelectedStation }: SwapStationProps) => {
  const dispatch = useAppDispatch();
  const newRouteNavigation = useNewRouteNavigation();

  const swapStationHandler = () => {
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
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1, marginRight: 15, rowGap: 8 }}>
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
          onPress={() => {
            dispatch(getStationType(DEPARTURE_STATION));
            newRouteNavigation.navigate('Search');
          }}
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
          onPress={() => {
            dispatch(getStationType(ARRIVAL_STATION));
            newRouteNavigation.navigate('Search');
          }}
        />
      </View>
      <TouchableOpacity onPress={swapStationHandler}>
        <IconSwapChange />
      </TouchableOpacity>
    </View>
  );
};

export default SwapStation;

const StationButton = styled(TextButton)`
  background-color: ${COLOR.GRAY_F9};
  width: 100%;
  height: 41px;
  border-radius: 8px;
  justify-content: center;
  padding-left: 10px;
  padding-right: 15px;
`;
