import React from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import { FontText } from '@/global/ui';
import { COLOR } from '@/global/constants';
import cn from 'classname';

interface ModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm?: () => void;
  title: string;
  confirmText?: string;
  cancelText: string;
  isSingleBtn?: boolean;
}

const MyTabModal = ({
  isVisible,
  onCancel,
  onConfirm,
  title,
  confirmText,
  cancelText,
  isSingleBtn,
}: ModalProps) => {
  return (
    <Modal animationType="fade" transparent visible={isVisible} onRequestClose={onCancel}>
      <View
        className="items-center justify-center flex-1"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      >
        <View className="items-center bg-white w-350 h-160 p-30 rounded-10">
          <FontText text={title} className="text-20 leading-30 text-black-717" fontWeight="600" />
          <View className="flex-row justify-between mt-20">
            <TouchableOpacity
              className={cn('flex-1 mr-5 rounded-5 p-10 items-center', {
                'bg-black-717': isSingleBtn,
                'bg-transparent border-1 border-gray-999': !isSingleBtn,
              })}
              onPress={onCancel}
            >
              <FontText
                text={cancelText}
                className={cn('text-16 leading-30', {
                  'text-white': isSingleBtn,
                  'text-gray-999': !isSingleBtn,
                })}
                fontWeight="600"
              />
            </TouchableOpacity>
            {confirmText && onConfirm && (
              <TouchableOpacity
                className="items-center flex-1 p-10 ml-5 bg-black-717 rounded-5"
                onPress={onConfirm}
              >
                <FontText
                  text={confirmText}
                  className="text-white text-16 leading-30"
                  fontWeight="700"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MyTabModal;
