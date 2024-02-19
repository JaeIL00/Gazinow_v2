import styled from '@emotion/native';
import { useState } from 'react';

import { IconButton, TextButton } from '@/global/ui';
import { COLOR, ARRIVAL_STATION, DEPARTURE_STATION } from '@/global/constants';
import { useAppDispatch } from '@/store';
import { getSeletedStation } from '@/store/modules';
import { SearchStationModal } from '@/screens/homeScreen/components';
import { TouchableOpacity, View } from 'react-native';
import { SelectedStationTypes } from '..';
import IconSwapChange from '@assets/icons/swap_change.svg';

type StationTypes = typeof DEPARTURE_STATION | typeof ARRIVAL_STATION;

interface SwapStationProps {
  selectedStation: SelectedStationTypes;
  setSelectedStation: React.Dispatch<React.SetStateAction<SelectedStationTypes>>;
}

const SwapStation = ({ selectedStation, setSelectedStation }: SwapStationProps) => {
  const dispatch = useAppDispatch();

  const [searchType, setSearchType] = useState<StationTypes>('출발역');
  const [isOpenSearchModal, setIsOpenSearchModal] = useState<boolean>(false);

  const closeSearchModal = () => setIsOpenSearchModal(false);

  const openSearchModal = (type: StationTypes) => {
    setSearchType(type);
    setIsOpenSearchModal(true);
  };

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

  const initSelectedStation = () => {
    setSelectedStation({
      departure: {
        stationName: '',
        stationLine: null,
      },
      arrival: {
        stationName: '',
        stationLine: null,
      },
    });
  };

  // useEffect(() => {
  //   queryClient.invalidateQueries(['search_paths']);
  // }, [selectedStation]);

  return (
    <>
      {isOpenSearchModal && (
        <SearchStationModal
          closeModal={closeSearchModal}
          setSubwayStation={setSelectedStation}
          searchType={searchType}
        />
      )}
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
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
            onPress={() => openSearchModal(DEPARTURE_STATION)}
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
            onPress={() => openSearchModal(ARRIVAL_STATION)}
          />
        </View>
        {/* <IconButton
          isFontIcon={false}
          imagePath="exchange_gray"
          iconWidth="20px"
          iconHeight="20px"
          
        /> */}
        <TouchableOpacity onPress={swapStation}>
          <IconSwapChange />
        </TouchableOpacity>
      </View>
    </>
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
