import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, FontText } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { SubwayRoute } from '@/components/savedRoutes';
import { useGetSavedRoutesQuery } from '@/hooks';
import IssuesBanner from './IssuesBanner';
import RecommendedRoutes from './RecommendedRoutes';

const SavedRouteBox = () => {
  const { data: savedRoutes } = useGetSavedRoutesQuery();
  const isRoutesExist = savedRoutes && savedRoutes.length > 0;

  const renderSavedRoutes = () => (
    <View>
      <View style={styles.titleContainer}>
        <View style={styles.textContainer}>
          <FontText
            value={`${savedRoutes[0].roadName}  `}
            textSize="20px"
            textWeight="Bold"
            lineHeight="25px"
            textColor={COLOR.BASIC_BLACK}
          />
          <FontText
            style={styles.grayEllipse}
            value="42분 이상 예상"
            textSize="16px"
            textWeight="Medium"
            lineHeight="21px"
            textColor={COLOR.GRAY_999}
          />
        </View>
        <View style={styles.textContainer}>
          <FontText
            value="세부정보  "
            textSize="16px"
            textWeight="Medium"
            lineHeight="21px"
            textColor={COLOR.GRAY_999}
          />
          <IconButton isFontIcon={false} imagePath="more_gray" iconWidth="8px" iconHeight="14px" />
        </View>
      </View>
      <View style={styles.containerSubwayRoute}>
        <SubwayRoute />
      </View>
      <IssuesBanner />
      <RecommendedRoutes />
    </View>
  );

  const renderNoSavedRoutes = () => (
    <FontText
      style={styles.messageStyle}
      value="저장한 경로가 없어요"
      textSize="16px"
      textWeight="Medium"
      lineHeight="500px"
      textColor={COLOR.GRAY_999}
    />
  );

  return isRoutesExist ? renderSavedRoutes() : renderNoSavedRoutes();
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
