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
          <FontText
            value={title}
            textSize="20px"
            textWeight="SemiBold"
            lineHeight={30}
            textColor={COLOR.BASIC_BLACK}
          />
          <View className="flex-row justify-between mt-20">
            <TouchableOpacity
              className={cn('flex-1 mr-5 rounded-5 p-10 items-center', {
                'bg-black-17': isSingleBtn,
                'bg-transparent border-1 border-gray-99': !isSingleBtn,
              })}
              onPress={onCancel}
            >
              <FontText
                value={cancelText}
                textSize="16px"
                textWeight="SemiBold"
                lineHeight={30}
                textColor={isSingleBtn ? COLOR.WHITE : COLOR.GRAY_999}
              />
            </TouchableOpacity>
            {confirmText && onConfirm && (
              <TouchableOpacity
                className="items-center flex-1 p-10 ml-5 bg-black-17 rounded-5"
                onPress={onConfirm}
              >
                <FontText
                  value={confirmText}
                  textSize="16px"
                  textWeight="Bold"
                  lineHeight={30}
                  textColor={COLOR.WHITE}
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
