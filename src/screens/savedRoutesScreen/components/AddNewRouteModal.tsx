import React from 'react';
import { Modal } from 'react-native';
import { SwapStation } from '@/screens/homeScreen/components';
import AddNewRouteHeader from './AddNewRouteHeader';

interface ModalProps {
  isVisible: boolean;
  onCancel: () => void;
}

const AddNewRouteModal = ({ isVisible, onCancel }: ModalProps) => {
  return (
    <Modal visible={isVisible} onRequestClose={onCancel}>
      <AddNewRouteHeader/>
      <SwapStation isWrap={false} isSavingNewRoute={true}/>
    </Modal>
  );
};

export default AddNewRouteModal;