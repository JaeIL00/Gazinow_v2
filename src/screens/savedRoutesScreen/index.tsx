import React, { useState } from 'react';
import styled from '@emotion/native';
import RenderSavedRoutes from './components/RenderSavedRoutes';
import { FontText, IconButton } from '@/global/ui';
import { COLOR } from '@/global/constants';
import AddNewRouteModal from './components/AddNewRouteModal';
const SavedRoutesScreen = () => {
  const [isAddRouteModalOpen, setIsAddRouteModalOpen] = useState<boolean>(false);

  const handleAddRoutePress = () => {
    setIsAddRouteModalOpen(true);
  };

  return (
    <Container>
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

const RouteContainer = styled.View`
  padding: 20px 20px 0px;
  background-color: ${COLOR.WHITE};
  border-radius: 15px;
`;
const Container = styled.ScrollView`
  padding: 0 16px 20px;
  background-color: ${COLOR.GRAY_F9};
`;
const AddContainer = styled.Pressable`
  padding: 0px 0px 20px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export default SavedRoutesScreen;
