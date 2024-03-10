import React from 'react';
import styled from '@emotion/native';
import { FontText, Space } from '@/global/ui';
import { Pressable } from 'react-native';
import IconLeftArrowHead from '@assets/icons/left_arrow_head.svg';
import IconCrossX from '@assets/icons/cross_x.svg';
import { useNewRouteNavigation } from '@/navigation/NewRouteNavigation';
import { useHomeNavigation } from '@/navigation/HomeNavigation';

const AddNewRouteHeader = () => {
  const newRouteNavigation = useNewRouteNavigation();
  const homeNavigation = useHomeNavigation();
  return (
    <>
      <Header>
        <Pressable hitSlop={20} onPress={() => newRouteNavigation.goBack()}>
          <IconLeftArrowHead color="#3F3F46" />
        </Pressable>
        <FontText value="새 경로 저장" textSize="18px" textWeight="Medium" lineHeight="23px" />
        <Pressable hitSlop={20} onPress={() => homeNavigation.popToTop()}>
          <IconCrossX />
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
