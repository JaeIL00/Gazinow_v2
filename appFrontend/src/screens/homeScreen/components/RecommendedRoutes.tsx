import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, TextButton, FontText, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import styled from '@emotion/native';
import { SubwaySimplePath } from '@/global/components';
import { RenderSavedRoutesType } from '@/global/apis/entity';
interface RecommendedRouteProps {
  pathData: RenderSavedRoutesType;
}

const RecommendedRoutes = ({ pathData }: RecommendedRouteProps) => {
  const routeDetail = () => {
    //TODO: 경로 상세 페이지로 이동
    console.log('dddd');
  };

  return (
    <Container>
      <TextContainer>
        <TextContainer>
          <FontText
            value="대체경로"
            textSize="16px"
            textWeight="SemiBold"
            lineHeight="21px"
            textColor={COLOR.BASIC_BLACK}
          />
          <Space width="8px" />
          <FontText
            value={`평균 ${pathData.totalTime}분`}
            textSize="12px"
            textWeight="Regular"
            lineHeight="15px"
            textColor={COLOR.GRAY_999}
          />
        </TextContainer>
        <TextContainer onPress={routeDetail}>
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
            onPress={routeDetail}
          />
        </TextContainer>
      </TextContainer>
      <Space height="4px" />
      <SubwaySimplePath
        pathData={pathData.subPaths}
        arriveStationName={pathData.lastEndStation}
        betweenPathMargin={24}
      />
    </Container>
  );
};
export default RecommendedRoutes;

const Container = styled.View`
  background: #f7f7f9;
  padding: 16px 16px 0;
  border-radius: 8px;
  margin: 8px 2px 0;
`;
const TextContainer = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
