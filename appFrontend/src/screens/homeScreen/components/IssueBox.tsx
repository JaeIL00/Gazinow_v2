import React, { useEffect, useState } from 'react';
import { FontText, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import IssuesBanner from './IssuesBanner';
import styled from '@emotion/native';
import { useGetSavedRoutesQuery } from '@/global/apis/hooks';
import { RenderSavedRoutesType } from '@/global/apis/entity';
import { SubwaySimplePath } from '@/global/components';
import IconRightArrowHead from '@/assets/icons/right_arrow_head.svg';
import { Pressable } from 'react-native';
import { useHomeNavigation } from '@/navigation/HomeNavigation';
import { RecommendedRoutes } from '.';

const IssueBox = () => {
  const homeNavigation = useHomeNavigation();
  const { data: savedRoutes } = useGetSavedRoutesQuery();
  const [hasIssueRoutes, setHasIssueRoutes] = useState<RenderSavedRoutesType[]>([]);

  useEffect(() => {
    if (savedRoutes) {
      const issueRoutes = savedRoutes.filter((savedRoute) => {
        return savedRoute.subPaths.some((subPath) => subPath.lanes[0].issueSummary.length > 0);
      });
      setHasIssueRoutes(issueRoutes);
    }
  }, [savedRoutes]);

  return (
    <>
      {hasIssueRoutes.map((route, index) => (
        <RouteContainer key={index}>
          <TextContainer>
            <TextContainer>
              <FontText
                value={route.roadName}
                textSize="18px"
                textWeight="Bold"
                lineHeight="23px"
                textColor={COLOR.BASIC_BLACK}
              />
              <Space width="8px" />
              <GrayEllipse>
                <FontText
                  value={
                    route.totalTime > 60
                      ? Math.floor(route.totalTime / 60) +
                        '시간 ' +
                        (route.totalTime % 60) +
                        '분 이상 예상'
                      : route.totalTime + '분 이상 예상'
                  }
                  textSize="12px"
                  textWeight="Medium"
                  lineHeight="14px"
                  textColor={COLOR.GRAY_999}
                />
              </GrayEllipse>
            </TextContainer>
            <Pressable
              hitSlop={20}
              onPress={() => homeNavigation.push('SubwayPathDetail', { state: route })}
            >
              <TextContainer
                onPress={() => homeNavigation.push('SubwayPathDetail', { state: route })}
              >
                <FontText
                  value="세부정보"
                  textSize="13px"
                  textWeight="Regular"
                  lineHeight="19px"
                  textColor={COLOR.GRAY_999}
                />
                <Space width="4px" />
                <IconRightArrowHead color={COLOR.GRAY_999} />
              </TextContainer>
            </Pressable>
          </TextContainer>

          <Space height="16px" />

          <SubwaySimplePath
            pathData={route.subPaths}
            arriveStationName={route.lastEndStation}
            betweenPathMargin={24}
          />
          <IssuesBanner subPathss={route.subPaths} />
          {/* TODO: 대체경로 매핑 */}
          {/* <RecommendedRoutes pathData={route} /> */}
        </RouteContainer>
      ))}
      {hasIssueRoutes.length === 0 && (
        <FontText
          value="저장한 경로에 이슈가 없어요."
          textSize="13px"
          textWeight="Regular"
          lineHeight="500px"
          textColor={COLOR.GRAY_999}
          textAlign="center"
        />
      )}
    </>
  );
};

export default IssueBox;

const RouteContainer = styled.View`
  margin: 20px 0 4px;
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
