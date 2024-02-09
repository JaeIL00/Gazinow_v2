import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, TextButton, FontText } from '@/global/ui';
import { COLOR } from '@/global/constants';
import styled from '@emotion/native';

const RecommendedRoutes = () => {
  const routeDetail = () => {
    console.log('dddd');
  };

  return (
    <Container>
      <View style={styles.titleContainer}>
        <View style={styles.textContainer}>
          <FontText
            value="대체 경로  "
            textSize="16px"
            textWeight="SemiBold"
            lineHeight="21px"
            textColor={COLOR.BASIC_BLACK}
          />
          <FontText
            value="평균 42분"
            textSize="12px"
            textWeight="Regular"
            lineHeight="15px"
            textColor={COLOR.BASIC_BLACK}
          />
        </View>
        <View style={styles.textContainer}>
          <TextButton
            value="세부정보  "
            textSize="13px"
            textColor={COLOR.GRAY_999}
            textWeight="Regular"
            lineHeight="19px"
            onPress={routeDetail}
          />
          <IconButton isFontIcon={false} imagePath="more_gray" iconWidth="4.5px" iconHeight="8px" />
        </View>
      </View>

    </Container>
  );
};

const Container = styled.View`
  background: #f7f7f9;
  padding: 16px;
  border-radius: 8px;
  margin: 2px;
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
