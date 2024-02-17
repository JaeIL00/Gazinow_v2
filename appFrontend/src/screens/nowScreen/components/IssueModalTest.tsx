import React from 'react';
import { FontText, Space } from '@/global/ui';
import { Modal, Pressable, View } from 'react-native';
import BackBtn from '@assets/icons/backBtn.svg';

interface IssueDetailProps {
  id: number;
  onRequestClose: () => void;
}

const IssueModalTest = ({ id, onRequestClose }: IssueDetailProps) => {
  return (
    <Modal onRequestClose={onRequestClose}>
      <View style={{ padding: 16 }}>
        <Space height="100px" />
        <Pressable hitSlop={10} onPress={onRequestClose}>
          <BackBtn />
        </Pressable>
        <Space height="100px" />
        <FontText value={id} textSize="16px" textWeight="SemiBold" lineHeight="21px" />
        <FontText
          value={`임시 화면\n테스트 편의를 위해 뒤로가기 버튼 넣어놓았습니다`}
          textSize="16px"
          textWeight="SemiBold"
          lineHeight="100px"
        />
      </View>
    </Modal>
  );
};

export default IssueModalTest;
