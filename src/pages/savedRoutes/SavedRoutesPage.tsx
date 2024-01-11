import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from '@/components/common/molecules';
import styled from '@emotion/native';
import { FontText } from '@/components/common/atoms';
import { COLOR } from '@/constants';
import { RenderSavedRoutes } from '@/components/savedRoutes';

const SavedRoutes = () => {
  return (
    <Container>
      <View style={styles.header}>
        <IconButton isFontIcon={false} imagePath="backBtn" iconWidth="20px" iconHeight="30px" />
        <FontText value="  저장한 경로" textSize="22px" textWeight="Bold" lineHeight="29px" textColor={COLOR.BASIC_BLACK} />
      </View>

      <View style={styles.container}>
        <RenderSavedRoutes />
        <View style={styles.containerAdd}>
          <IconButton isFontIcon={false} imagePath="addRoute" iconWidth="20px" iconHeight="20px" />
          <FontText value="  추가하기" textSize="16px" textWeight="Medium" lineHeight="21px" textColor={COLOR.GRAY_999} />
        </View>
      </View>
    </Container>
  );
};

const Container = styled.View`
  padding: 0 16px;
  flex-direction: column;
`;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  containerAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  header: {
    marginVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SavedRoutes;
