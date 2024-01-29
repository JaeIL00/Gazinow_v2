import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import styled from '@emotion/native';
import { useRootNavigation } from '@/navigation/RootNavigation';
import RenderSavedRoutes from './components/RenderSavedRoutes';
import { FontText, IconButton } from '@/global/ui';
import { ADD_NEW_ROUTE, COLOR, EDIT_ROUTE_NAVIGATION } from '@/global/constants';

const SavedRoutesScreen = () => {
  const rootNavigation = useRootNavigation();
  return (
    <ScrollView>
      <Container>
        <ScrollView>
          <View style={styles.container}>
            <RenderSavedRoutes />
            <AddContainer
              onPress={() =>
                rootNavigation.navigate(EDIT_ROUTE_NAVIGATION, { screen: ADD_NEW_ROUTE })
              }
            >
              <IconButton
                isFontIcon={false}
                imagePath="addRoute"
                iconWidth="21px"
                iconHeight="21px"
              />
              <FontText
                value="  경로 추가하기"
                textSize="14px"
                textWeight="Medium"
                lineHeight="21px"
                textColor={COLOR.GRAY_999}
              />
            </AddContainer>
          </View>
        </ScrollView>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 15,
  },
});
const Container = styled.View`
  padding: 0 16px 20px;
  flex-direction: column;
  background-color: ${COLOR.LIGHT_GRAY};
  flex: 1;
`;
const AddContainer = styled.Pressable`
  padding: 0px 0px 20px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export default SavedRoutesScreen;
