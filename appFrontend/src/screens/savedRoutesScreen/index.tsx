import React from 'react';
import styled from '@emotion/native';
import EditSavedRoutesList from './components/EditSavedRoutesList';
import { FontText, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { Pressable, SafeAreaView } from 'react-native';
import IconPlusBtn from '@assets/icons/plus_circle.svg';
import IconLeftArrowHead from '@assets/icons/left_arrow_head.svg';
import { useNewRouteNavigation } from '@/navigation/NewRouteNavigation';

const SavedRoutesScreen = () => {
  const navigation = useRootNavigation();
  const newRouteNavigation = useNewRouteNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.GRAY_F9 }}>
      <Container>
        <Header>
          <Pressable hitSlop={20} onPress={() => navigation.goBack()}>
            <IconLeftArrowHead color="#3F3F46" />
          </Pressable>
          <Space width="12px" />
          <FontText value="저장경로 편집" textSize="18px" textWeight="Medium" lineHeight="23px" />
        </Header>
        <Space height="4px" />
        <RouteContainer>
          <EditSavedRoutesList />
          <AddContainer onPress={() => newRouteNavigation.navigate('Swap')}>
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
