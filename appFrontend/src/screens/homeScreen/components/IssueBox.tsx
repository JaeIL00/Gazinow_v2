import React, { useEffect, useState } from 'react';
import { FontText, Space, TextButton } from '@/global/ui';
import { COLOR } from '@/global/constants';
import IssuesBanner from './IssuesBanner';
import RecommendedRoutes from './RecommendedRoutes';
import styled from '@emotion/native';
import { useGetSavedRoutesQuery } from '@/global/apis/hook';
import { Path, RenderSavedRoutesType } from '@/global/apis/entity';
import { SubwaySimplePath } from '@/global/components';
import NewRouteDetailModal from '@/screens/savedRoutesScreen/components/NewRouteDetailModal';
import IconRightArrowHead from '@/assets/icons/right_arrow_head.svg';
import { Pressable } from 'react-native';

const IssueBox = () => {
  const { data: savedRoutes } = useGetSavedRoutesQuery();
  const [hasIssueRoutes, setHasIssueRoutes] = useState<RenderSavedRoutesType[]>([]);
  const [isRouteDetailOpened, setIsRouteDetailOpened] = useState<boolean>(false);
  const [routeDetail, setRouteDetail] = useState<Path>();

  const handleOpenDetail = (index: number) => {
    setIsRouteDetailOpened(true);
    setRouteDetail(hasIssueRoutes[index]);
  };

  useEffect(() => {
    if (savedRoutes) {
      const issueRoutes = savedRoutes.filter((savedRoute) => {
        return savedRoute.subPaths.some((subPath) =>
          subPath.stations.some((station) => station.issueSummary !== null),
        );
      });
      setHasIssueRoutes(issueRoutes);
    }
  }, [savedRoutes]);

  return (
    <>
      {isRouteDetailOpened && routeDetail && (
        <NewRouteDetailModal
          item={routeDetail}
          onRequestClose={() => setIsRouteDetailOpened(false)}
        />
      )}
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
                  value={`${route.totalTime}분 이상 예상`}
                  textSize="12px"
                  textWeight="Medium"
                  lineHeight="14px"
                  textColor={COLOR.GRAY_999}
                />
              </GrayEllipse>
            </TextContainer>
            <Pressable hitSlop={20} onPress={() => handleOpenDetail(index)}>
              <TextContainer>
                <TextButton
                  value="세부정보"
                  textSize="13px"
                  textWeight="Regular"
                  lineHeight="19px"
                  textColor={COLOR.GRAY_999}
                  onPress={() => handleOpenDetail(index)}
                />
                <Space width="4px" />
                <IconRightArrowHead />
              </TextContainer>
            </Pressable>
          </TextContainer>

          {/* TODO: 이슈 아이콘 넣기 */}
          <SubwaySimplePath
            pathData={route.subPaths}
            arriveStationName={route.lastEndStation}
            betweenPathMargin={24}
          />
          <IssuesBanner issueSummary={route.subPaths[0].stations[0].issueSummary[0]} />
          <Space height="16px" />
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
