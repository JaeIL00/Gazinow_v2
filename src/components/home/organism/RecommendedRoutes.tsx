import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, TextButton } from '@/components/common/molecules';
import { FontText } from '@/components/common/atoms';
import { COLOR } from '@/constants';
import { SubwayRoute } from '@/components/savedRoutes';
import styled from '@emotion/native';

const RecommendedRoutes = () => {

  const routeDetail = () => {
    console.log('dddd')
  }

  return (
    <Container>
      <View style={styles.titleContainer}>
        <View style={styles.textContainer}>
          <FontText
            value="대체 경로  "
            textSize="20px"
            textWeight="Bold"
            lineHeight="25px"
            textColor={COLOR.BASIC_BLACK}
          />
          <FontText
            value="평균 42분"
            textSize="14px"
            textWeight="Regular"
            lineHeight="15px"
            textColor={COLOR.BASIC_BLACK}
          />
        </View>
        <View style={styles.textContainer}>
          <TextButton
            value="세부정보  "
            textSize="16px"
            textColor={COLOR.GRAY_999}
            textWeight="Medium"
            lineHeight="21px"
            onPress={routeDetail}
          />
          <IconButton isFontIcon={false} imagePath="more_gray" iconWidth="8px" iconHeight="14px" />
        </View>
      </View>

      <View style={styles.containerSubwayRoute}><SubwayRoute /></View>
    </Container>
  );
};

const Container = styled.View`
  backgroundColor: #F2F2F2;
  padding: 0 16px;
  borderRadius: 13px;
  padding: 20px;
`;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerSubwayRoute: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default RecommendedRoutes;
