import React from 'react';
import styled from '@emotion/native';
import { FontText, IconButton, Space } from '@/global/ui';

interface HeaderProps {
  onBackBtnPress: () => void;
  onCloseBtnPress: () => void;
}

const AddNewRouteHeader = ({ onBackBtnPress, onCloseBtnPress }: HeaderProps) => {
  return (
    <>
      <Header>
        <IconButton
          isFontIcon={false}
          imagePath="backBtn"
          iconHeight="24px"
          iconWidth="24px"
          onPress={onBackBtnPress}
        />
        <FontText value="새 경로 저장" textSize="18px" textWeight="Medium" lineHeight="23px" />
        <IconButton
          isFontIcon={false}
          imagePath="x"
          iconHeight="24px"
          iconWidth="24px"
          onPress={onCloseBtnPress}
        />
      </Header>
      <Space height="8px" />
    </>
  );
};

const Header = styled.View`
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
`;

export default AddNewRouteHeader;
