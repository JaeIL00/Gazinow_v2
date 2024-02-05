import React, { useState } from 'react';
import { Modal } from 'react-native';
import AddNewRouteHeader from './AddNewRouteHeader';
import NewSearchSwapStation, { SelectedStationTypes } from './NewSearchSwapStation';

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

  return (
    <Modal visible={isVisible} onRequestClose={onCancel}>
      <AddNewRouteHeader />
      <NewSearchSwapStation setSeletedStation={setSeletedStation} />
    </Modal>
  );
};

export default AddNewRouteModal;
