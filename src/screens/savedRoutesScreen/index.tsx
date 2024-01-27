import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, FontText } from '@/global/ui';
import styled from '@emotion/native';
import { COLOR, EDIT_ROUTE_NAVIGATION, ADD_NEW_ROUTE } from '@/global/constants';
import { useRootNavigation } from '@/navigation/RootNavigation';
import RenderSavedRoutes from './components/RenderSavedRoutes';

const SavedRoutesScreen = () => {
  const rootNavigation = useRootNavigation();
  return (
    <Container>
      <View style={styles.container}>
        <RenderSavedRoutes />
        <AddContainer
          onPress={() => rootNavigation.navigate(EDIT_ROUTE_NAVIGATION, { screen: ADD_NEW_ROUTE })}
        >
          <IconButton isFontIcon={false} imagePath="addRoute" iconWidth="20px" iconHeight="20px" />
          <FontText
            value="  추가하기"
            textSize="16px"
            textWeight="Medium"
            lineHeight="21px"
            textColor={COLOR.GRAY_999}
          />
        </AddContainer>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  containerAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
const Container = styled.View`
  padding: 0 16px;
  flex-direction: column;
  background-color: ${COLOR.LIGHT_GRAY};
`;
const AddContainer = styled.Pressable`
  padding: 0px 0px 20px;
  alignitems: center;
  justifycontent: center;
  flex-direction: row;
`;

export default SavedRoutesScreen;
