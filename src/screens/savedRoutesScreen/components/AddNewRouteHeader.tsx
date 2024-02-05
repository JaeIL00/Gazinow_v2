import React from 'react';
import styled from '@emotion/native';
import { IconButton, Space, TextButton } from '@/global/ui';

const AddNewRouteHeader = () => {
  const onBackBtnPress = () => {
  };

  const onCloseBtnPress = () => {
  };

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
        <TextButton value="새 경로 저장" textSize="18px" textWeight="Medium" />
        <IconButton
          isFontIcon={false}
          imagePath="x"
          iconHeight="24px"
          iconWidth="24px"
          onPress={onCloseBtnPress}
        />
      </Header>
      <Space height="9px" />
    </>
  );
};

const Header = styled.View`
  padding: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default AddNewRouteHeader;
