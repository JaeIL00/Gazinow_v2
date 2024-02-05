import styled from '@emotion/native';
import { useEffect, useState } from 'react';

import { IconButton, TextButton } from '@/global/ui';
import { COLOR, ARRIVAL_STATION, DEPARTURE_STATION } from '@/global/constants';
import { useAppDispatch } from '@/store';
import { getSeletedStation } from '@/store/modules';
import type { StationDataTypes } from '@/store/modules';
import SelectNewRouteModal from '@/screens/savedRoutesScreen/components/SelectNewRouteModal';
import { Modal } from 'react-native';
import SearchStation from './NewSearchStation';

export interface SelectedStationTypes {
  departure: StationDataTypes;
  arrival: StationDataTypes;
}

type StationTypes = typeof DEPARTURE_STATION | typeof ARRIVAL_STATION;

interface NewSearchSwapStationProps {
  setSeletedStation: React.Dispatch<React.SetStateAction<SelectedStationTypes>>;
}

const NewSearchSwapStation = ({ setSeletedStation }: NewSearchSwapStationProps) => {
  const dispatch = useAppDispatch();

  const [searchType, setSearchType] = useState<StationTypes>('출발역');
  const [isOpenSearchStation, setIsOpenSearchStation] = useState<boolean>(false);
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

  const closeSearchModal = () => setIsOpenSearchStation(false);

  const openSearchModal = (type: StationTypes) => {
    setSearchType(type);
    setIsOpenSearchStation(true);
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

  useEffect(() => {
    if (selectedStation.arrival.stationName && selectedStation.departure.stationName) {
      setSeletedStation({
        arrival: selectedStation.arrival,
        departure: selectedStation.departure,
      });
      // FIXME: 경로 선택은 여기서 띄워주지 말아주세요
      // setIsOpenSelectNewRouteModal(true);
    }
  }, [selectedStation]);

  if (isOpenSearchStation) {
    return (
      <SearchStation
        closeModal={closeSearchModal}
        setSubwayStation={setSelectedStation}
        searchType={searchType}
      />
    );
  }
  return (
    <>
      {/* 
      FIXME: SwapStation 컴포넌트에 의존하지 않고 독립적으로 부모에게 동일한 자식 컴포넌트로 사용해주세요. 
      지금 구조는 부모 자식(SwapStation)의 자식(SelectNewRouteModal)입니다.
      <Modal visible={isOpenSelectNewRouteModal}>
        <SelectNewRouteModal />
      </Modal> */}
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

export default NewSearchSwapStation;

const Container = styled.View`
  padding: 0 16px;
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
