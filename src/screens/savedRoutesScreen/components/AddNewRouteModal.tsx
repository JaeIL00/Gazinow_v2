import React, { useState } from 'react';
import { Modal } from 'react-native';
import AddNewRouteHeader from './AddNewRouteHeader';
import NewSearchSwapStation, { SelectedStationTypes } from './NewSearchSwapStation';
import SelectNewRouteModal from './SelectNewRouteModal';
import { Path } from 'react-native-svg';
import NameNewRouteModal from './NameNewRouteModal';
import NewRouteDetailModal from './NewRouteDetailModal';

interface ModalProps {
  isVisible: boolean;
  onCancel: () => void;
}

const AddNewRouteModal = ({ isVisible, onCancel }: ModalProps) => {
  // 선택한 경로 값을 갖고서 경로 선택하는 컴포넌트로 상태 전달하기
  const [seletedStation, setSeletedStation] = useState<SelectedStationTypes>({
    arrival: {
      stationName: '',
      stationLine: null,
    },
    departure: {
      stationName: '',
      stationLine: null,
    },
  });
  const [isNewSearchSwapStationOpened, setIsNewSearchSwapStationOpened] = useState<boolean>(true);
  const [isOpenSelectNewRouteModal, setIsOpenSelectNewRouteModal] = useState<boolean>(false);
  const [seletedRoutePath, setSeletedRoutePath] = useState<Path | null>(null);
  const [isNewRouteDetailModalOpened, setIsNewRouteDetailModalOpened] = useState<boolean>(false);
  const [isNameNewRouteModalOpened, setIsNameNewRouteModalOpened] = useState<boolean>(false);

  return (
    <Modal visible={isVisible} onRequestClose={onCancel}>
      <AddNewRouteHeader
        onCancel={onCancel}
        isNewSearchSwapStationOpened={isNewSearchSwapStationOpened}
        setIsNewSearchSwapStationOpened={setIsNewSearchSwapStationOpened}
        isOpenSelectNewRouteModal={isOpenSelectNewRouteModal}
        setIsOpenSelectNewRouteModal={setIsOpenSelectNewRouteModal}
        isNameNewRouteModalOpened={isNameNewRouteModalOpened}
        setIsNameNewRouteModalOpened={setIsNameNewRouteModalOpened}
      />
      {isNewSearchSwapStationOpened && (
        <NewSearchSwapStation
          setSeletedStation={setSeletedStation}
          setIsOpenSelectNewRouteModal={setIsOpenSelectNewRouteModal}
        />
      )}
      {isOpenSelectNewRouteModal && (
        <SelectNewRouteModal
          onCancel={onCancel}
          seletedStation={seletedStation}
          setSeletedRoutePath={setSeletedRoutePath}
          setIsOpenSelectNewRouteModal={setIsOpenSelectNewRouteModal}
          setIsNewRouteDetailModalOpened={setIsNewRouteDetailModalOpened}
          setIsNameNewRouteModalOpened={setIsNameNewRouteModalOpened}
          setIsNewSearchSwapStationOpened={setIsNewSearchSwapStationOpened}
        />
      )}

      {isNewRouteDetailModalOpened && seletedRoutePath && (
        <NewRouteDetailModal
          item={seletedRoutePath}
          setIsNewRouteDetailModalOpened={setIsNewRouteDetailModalOpened}
        />
      )}

      {isNameNewRouteModalOpened && seletedRoutePath && (
        <NameNewRouteModal
          item={seletedRoutePath}
          isOpenSelectNewRouteModal={isOpenSelectNewRouteModal}
          setIsOpenSelectNewRouteModal={setIsOpenSelectNewRouteModal}
          isNameNewRouteModalOpened={isNameNewRouteModalOpened}
          setIsNameNewRouteModalOpened={setIsNameNewRouteModalOpened}
        />
      )}
    </Modal>
  );
};

export default AddNewRouteModal;
