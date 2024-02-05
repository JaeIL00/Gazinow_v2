import styled from '@emotion/native';
import { useEffect, useState } from 'react';
import { Shadow } from 'react-native-shadow-2';

import { IconButton, TextButton } from '@/global/ui';
import { COLOR, ARRIVAL_STATION, DEPARTURE_STATION } from '@/global/constants';
import { useAppDispatch } from '@/store';
import { getSeletedStation } from '@/store/modules';
import type { StationDataTypes } from '@/store/modules';
import SearchStationModal from './SearchStationModal';
import { useHomeNavigation } from '@/navigation/HomeNavigation';
import SelectNewRouteModal from '@/screens/savedRoutesScreen/components/SelectNewRouteModal';
import { Modal } from 'react-native';

export interface SelectedStationTypes {
  departure: StationDataTypes;
  arrival: StationDataTypes;
}

type StationTypes = typeof DEPARTURE_STATION | typeof ARRIVAL_STATION;

interface SwapProps {
  isWrap?: boolean;
  isSavingNewRoute?: boolean | undefined;
}

const SwapStation = ({ isWrap, isSavingNewRoute }: SwapProps) => {
  const homeNavigation = useHomeNavigation();
  const dispatch = useAppDispatch();

  const [searchType, setSearchType] = useState<StationTypes>('출발역');
  const [isOpenSearchModal, setIsOpenSearchModal] = useState<boolean>(false);
  const [isOpenSelectNewRouteModal, setIsOpenSelectNewRouteModal] = useState<boolean>(false);
  const [selectedStation, setSelectedStation] = useState<SelectedStationTypes>({
    departure: {
      stationName: '',
      stationLine: null,
    },
    arrival: {
      stationName: '',
      stationLine: null,
    },
  });

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

  useEffect(() => {
    if (selectedStation.arrival.stationName && selectedStation.departure.stationName) {
      initSelectedStation();
      dispatch(
        getSeletedStation({
          arrival: selectedStation.arrival,
          departure: selectedStation.departure,
        }),
      );
      isSavingNewRoute
        ? setIsOpenSelectNewRouteModal(true)
        : homeNavigation.navigate('SubwayPathResult', { isSavingNewRoute: isSavingNewRoute });
    }
  }, [selectedStation]);

  return (
    <>
      {isOpenSearchModal && (
        <SearchStationModal
          closeModal={closeSearchModal}
          setSubwayStation={setSelectedStation}
          searchType={searchType}
          isSavingNewRoute={isSavingNewRoute}
        />
      )}
      <Modal visible={isOpenSelectNewRouteModal}>
        <SelectNewRouteModal />
      </Modal>
      <Container
        isWrap={isWrap}
        offset={[0, 4]}
        distance={34}
        startColor="rgba(0,0,0,0.05)"
        disabled={!isWrap}
      >
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
        </InnerBox>
        <IconButton
          isFontIcon={false}
          imagePath="exchange_gray"
          iconWidth="20px"
          iconHeight="20px"
          onPress={swapStation}
        />
      </Container>
    </>
  );
};

export default SwapStation;

const Container = styled(Shadow)<SwapProps>`
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
  background-color: ${COLOR.LIGHT_GRAY};
  width: 100%;
  height: 41px;
  border-radius: 8px;
  justify-content: center;
  padding-left: 10px;
  padding-right: 15px;
`;
