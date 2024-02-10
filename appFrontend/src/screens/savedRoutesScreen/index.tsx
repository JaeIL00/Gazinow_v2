import React, { useState } from 'react';
import styled from '@emotion/native';
import RenderSavedRoutes from './components/RenderSavedRoutes';
import { FontText, IconButton, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import AddNewRouteModal from './components/AddNewRouteModal';
import { useRootNavigation } from '@/navigation/RootNavigation';
const SavedRoutesScreen = () => {
  const [isAddRouteModalOpen, setIsAddRouteModalOpen] = useState<boolean>(false);

  const handleAddRoutePress = () => {
    setIsAddRouteModalOpen(true);
  };

  const navigation = useRootNavigation();

  return (
    <Container>
      <Header>
        <IconButton
          isFontIcon={false}
          imagePath="backBtn"
          iconHeight="24px"
          iconWidth="24px"
          onPress={() => navigation.goBack()}
        />
        <Space width="12px" />
        <FontText value="저장한 경로" textSize="18px" textWeight="Medium" lineHeight="23px" />
      </Header>
      <Space height="4px" />
      <RouteContainer>
        <RenderSavedRoutes />
        <AddContainer onPress={handleAddRoutePress}>
          <IconButton isFontIcon={false} imagePath="addRoute" iconWidth="21px" iconHeight="21px" />
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
  );
};
const Container = styled.ScrollView`
  padding: 0 16px 20px;
  background-color: ${COLOR.GRAY_F9};
`;
const Header = styled.View`
  padding: 16px 0;
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
