import React from 'react';
import styled from '@emotion/native';
import { FontText, Space } from '@/global/ui';
import { Pressable } from 'react-native';
import BackBtn from '@assets/icons/backBtn.svg';
import CloseBtn from '@assets/icons/closeBtn.svg';

interface HeaderProps {
  onBackBtnPress: () => void;
  onCloseBtnPress: () => void;
}

const AddNewRouteHeader = ({ onBackBtnPress, onCloseBtnPress }: HeaderProps) => {
  return (
    <>
      <Header>
        <Pressable hitSlop={20} onPress={onBackBtnPress}>
          <BackBtn />
        </Pressable>
        <FontText value="새 경로 저장" textSize="18px" textWeight="Medium" lineHeight="23px" />
        <Pressable hitSlop={20} onPress={onCloseBtnPress}>
          <CloseBtn />
        </Pressable>
      </Header>
      <Space height="8px" />
    </>
  );
};

const Header = styled.View`
  padding: 0 24px;
  height: 56px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default AddNewRouteHeader;
