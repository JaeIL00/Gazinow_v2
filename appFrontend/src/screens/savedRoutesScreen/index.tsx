import React, { useState } from 'react';
import styled from '@emotion/native';
import RenderSavedRoutes from './components/RenderSavedRoutes';
import { FontText, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import AddNewRouteModal from './components/AddNewRouteModal';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { Pressable, SafeAreaView } from 'react-native';
import IconPlusBtn from '@assets/icons/plus_circle.svg';
import IconLeftArrowHead from '@assets/icons/left_arrow_head.svg';

const SavedRoutesScreen = () => {
  const [isAddRouteModalOpen, setIsAddRouteModalOpen] = useState<boolean>(false);
  const navigation = useRootNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Header>
          <Pressable hitSlop={20} onPress={() => navigation.goBack()}>
            <IconLeftArrowHead />
          </Pressable>
          <Space width="12px" />
          <FontText value="저장경로 편집" textSize="18px" textWeight="Medium" lineHeight="23px" />
        </Header>
        <Space height="4px" />
        <RouteContainer>
          <RenderSavedRoutes />
          <AddContainer onPress={() => setIsAddRouteModalOpen(true)}>
            <IconPlusBtn />
            <FontText
              value="  경로 추가하기"
              textSize="14px"
              textWeight="Medium"
              lineHeight="21px"
              textColor={COLOR.GRAY_999}
            />
          </AddContainer>
        </RouteContainer>
        <AddNewRouteModal
          isVisible={isAddRouteModalOpen}
          onCancel={() => setIsAddRouteModalOpen(false)}
        />
      </Container>
    </SafeAreaView>
  );
};
const Container = styled.ScrollView`
  padding: 0 16px 20px;
  background-color: ${COLOR.GRAY_F9};
`;
const Header = styled.View`
  padding: 0 0 0 8px;
  height: 56px;
  flex-direction: row;
  align-items: center;
`;
const RouteContainer = styled.View`
  background-color: ${COLOR.WHITE};
  border-radius: 15px;
`;
const AddContainer = styled.Pressable`
  padding: 20px 0px 24px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export default SavedRoutesScreen;
