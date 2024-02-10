import React, { useState } from 'react';
import { IconButton, FontText, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import IssuesBanner from './IssuesBanner';
import RecommendedRoutes from './RecommendedRoutes';
import styled from '@emotion/native';
import { useGetSavedRoutesQuery } from '@/global/apis/hook';
import { RenderSavedRoutesType } from '@/global/apis/entity';
import { SubwaySimplePath } from '@/global/components';

const IssueBox = () => {
  const { data: savedRoutes } = useGetSavedRoutesQuery();

  const [hasIssueRoute, setHasIssueRoute] = useState<RenderSavedRoutesType>();

  savedRoutes.map((item: RenderSavedRoutesType) => {
    if (item.issues !== null) {
      setHasIssueRoute(item);
    }
  });

  const routeDetail = () => {
    console.log('dddd');
    //TODO: 경로 상세 페이지로 이동
  };

  if (hasIssueRoute) {
    return (
      <RouteContainer>
        <TextContainer>
          <TextContainer>
            <FontText
              value={hasIssueRoute.roadName}
              textSize="18px"
              textWeight="Bold"
              lineHeight="23px"
              textColor={COLOR.BASIC_BLACK}
            />
            <Space width="8px" />
            <GrayEllipse>
              <FontText
                value={`${hasIssueRoute.totalTime}분 이상 예상`}
                textSize="12px"
                textWeight="Medium"
                lineHeight="14px"
                textColor={COLOR.GRAY_999}
              />
            </GrayEllipse>
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

        {/* TODO: 이슈 아이콘 넣기 */}
        <SubwaySimplePath
          pathData={hasIssueRoute.subPaths}
          arriveStationName={hasIssueRoute.lastEndStation}
          betweenPathMargin={24}
        />
        <IssuesBanner pathData={hasIssueRoute} />
        <Space height="16px" />
        {/* TODO: 대체경로 매핑 */}
        <RecommendedRoutes pathData={hasIssueRoute} />
      </RouteContainer>
    );
  } else {
    return (
      <FontText
        value="저장한 경로에 이슈가 없어요."
        textSize="13px"
        textWeight="Regular"
        lineHeight="500px"
        textColor={COLOR.GRAY_999}
        textAlign="center"
      />
    );
  }
};

export default IssueBox;

const RouteContainer = styled.View`
  margin: 20px 0 28px;
`;
const TextContainer = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const GrayEllipse = styled.View`
  padding: 4px 6px;
  border-radius: 16px;
  background: #f7f7f9;
`;
