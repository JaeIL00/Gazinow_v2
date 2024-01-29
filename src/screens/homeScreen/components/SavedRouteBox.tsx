import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, FontText } from '@/global/ui';
import { COLOR } from '@/global/constants';
import IssuesBanner from './IssuesBanner';
import RecommendedRoutes from './RecommendedRoutes';
import SubwayRoute from '@/screens/selectNewRouteScreen/components/SubwayRoute';
import { useGetSavedRoutesQuery } from '@/global/apis/hook';
import styled from '@emotion/native';

const SavedRouteBox = () => {
  const { data: savedRoutes } = useGetSavedRoutesQuery();
  const isRoutesExist = savedRoutes && savedRoutes.length > 0;
  if (isRoutesExist) {
    return (
      <View>
        <View style={styles.titleContainer}>
          <View style={styles.textContainer}>
            <FontText
              value={`${savedRoutes[0].roadName}  `}
              textSize="18px"
              textWeight="Bold"
              lineHeight="23px"
              textColor={COLOR.BASIC_BLACK}
            />
            <GrayEllipse>
              <FontText
                value="42분 이상 예상"
                textSize="12px"
                textWeight="Medium"
                lineHeight="14px"
                textColor={COLOR.GRAY_999}
              />
            </GrayEllipse>
          </View>
          <View style={styles.textContainer}>
            <FontText
              value="세부정보  "
              textSize="13px"
              textWeight="Regular"
              lineHeight="19px"
              textColor={COLOR.GRAY_999}
            />
            <IconButton
              isFontIcon={false}
              imagePath="more_gray"
              iconWidth="4.5px"
              iconHeight="8px"
            />
          </View>
        </View>
        <View style={styles.containerSubwayRoute}>
          <SubwayRoute />
        </View>
        <IssuesBanner />
        <RecommendedRoutes />
      </View>
    );
  } else {
    return (
      <FontText
        style={styles.messageStyle}
        value="저장한 경로가 없어요"
        textSize="16px"
        textWeight="Medium"
        lineHeight="500px"
        textColor={COLOR.GRAY_999}
      />
    );
  }
};

const styles = StyleSheet.create({
  messageStyle: {
    textAlign: 'center',
  },
  titleContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  grayEllipse: {
    backgroundColor: '#f0f0f0',
    borderRadius: 40,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  containerSubwayRoute: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SavedRouteBox;

const GrayEllipse = styled.View`
  padding: 4px 6px;
  border-radius: 16px;
  background: #f7f7f9;
`;
