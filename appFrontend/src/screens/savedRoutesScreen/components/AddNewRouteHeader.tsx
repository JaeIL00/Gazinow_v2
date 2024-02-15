import React from 'react';
import styled from '@emotion/native';
import { FontText, IconButton, Space } from '@/global/ui';

interface HeaderProps {
  onCancel: () => void;
  isNewSearchSwapStationOpened: boolean;
  setIsNewSearchSwapStationOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenSelectNewRouteModal: boolean;
  setIsOpenSelectNewRouteModal: React.Dispatch<React.SetStateAction<boolean>>;
  isNameNewRouteModalOpened: boolean;
  setIsNameNewRouteModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddNewRouteHeader = ({
  onCancel,
  isNewSearchSwapStationOpened,
  setIsNewSearchSwapStationOpened,
  isOpenSelectNewRouteModal,
  setIsOpenSelectNewRouteModal,
  isNameNewRouteModalOpened,
  setIsNameNewRouteModalOpened,
}: HeaderProps) => {
  const onBackBtnPress = () => {
    if (isNewSearchSwapStationOpened || isOpenSelectNewRouteModal) {
      onCancel();
      setIsOpenSelectNewRouteModal(false);
    } else if (isNameNewRouteModalOpened) {
      setIsNameNewRouteModalOpened(false);
      setIsNewSearchSwapStationOpened(true);
      setIsOpenSelectNewRouteModal(true);
    }
  };

  const onCloseBtnPress = () => {
    if (isNameNewRouteModalOpened) {
      setIsNameNewRouteModalOpened(false);
      setIsNewSearchSwapStationOpened(true);
    }
    setIsOpenSelectNewRouteModal(false);
    onCancel();
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
        <FontText value="새 경로 저장" textSize="18px" textWeight="Medium" />
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
