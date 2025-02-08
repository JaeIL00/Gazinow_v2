import React from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import { FontText } from '@/global/ui';

interface ModalProps {
  isVisible: boolean;
  title: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText: string;
  cancelText?: string;
}

const MyTabModal = ({
  isVisible,
  onCancel,
  onConfirm,
  title,
  confirmText,
  cancelText,
}: ModalProps) => {
  return (
    <Modal animationType="fade" transparent visible={isVisible} onRequestClose={onCancel}>
      <View className="items-center justify-center flex-1 bg-[#00000060]">
        <View className="items-center justify-between bg-white w-[81%] px-24 py-28 space-y-20 rounded-12">
          <FontText text={title} className="text-18" fontWeight="600" />
          <View className="flex-row space-x-8">
            {cancelText && (
              <TouchableOpacity
                className="flex-1 p-12 border-1 border-gray-999 rounded-5"
                onPress={onCancel}
              >
                <FontText
                  text={cancelText}
                  className="text-center text-gray-999 text-14 leading-21"
                  fontWeight="600"
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity className="flex-1 p-12 bg-black-717 rounded-5" onPress={onConfirm}>
              <FontText
                text={confirmText}
                className="text-center text-white text-14 leading-21"
                fontWeight="600"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MyTabModal;
