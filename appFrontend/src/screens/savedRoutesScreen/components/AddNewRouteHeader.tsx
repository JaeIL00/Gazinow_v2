import React from 'react';
import styled from '@emotion/native';
import { FontText, IconButton, Space } from '@/global/ui';
import { Platform, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface HeaderProps {
  onBackBtnPress: () => void;
  onCloseBtnPress: () => void;
}

const AddNewRouteHeader = ({ onBackBtnPress, onCloseBtnPress }: HeaderProps) => {
  const StatusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) + 6 : (StatusBar.currentHeight as number) - 8;

  return (
    <>
      <Header
        style={{
          paddingTop: StatusBarHeight,
        }}
      >
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
  align-items: center;
`;

export default AddNewRouteHeader;
