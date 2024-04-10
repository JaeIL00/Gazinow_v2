import React from 'react';
import { Pressable, View } from 'react-native';
import { FontText, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import styled from '@emotion/native';
import { SubwaySimplePath } from '@/global/components';
import { RenderSavedRoutesType } from '@/global/apis/entity';
import IconRightArrowHead from '@/assets/icons/right_arrow_head.svg';
import { useHomeNavigation } from '@/navigation/HomeNavigation';
import { IssuesBanner } from '.';

interface SavedRouteBoxProps {
  savedRoutes: RenderSavedRoutesType[];
}

const SavedRouteBox = ({ savedRoutes }: SavedRouteBoxProps) => {
  const homeNavigation = useHomeNavigation();

  if (!savedRoutes.length)
    return (
      <FontText
        value="저장한 경로가 없어요"
        textSize="13px"
        textWeight="Regular"
        lineHeight="500px"
        textColor={COLOR.GRAY_999}
        textAlign="center"
      />
    );
  return (
    <View>
      {savedRoutes.map((item: RenderSavedRoutesType, index: number) => (
        <RouteContainer key={item.id}>
          {index !== 0 && (
            <BorderContainer>
              <Space height="1px" width="999px" backgroundColor={COLOR.GRAY_F9} />
            </BorderContainer>
          )}
          <TitleContainer>
            <TextContainer>
              <FontText
                value={item.roadName}
                textSize="18px"
                textWeight="Bold"
                lineHeight="23px"
                textColor={COLOR.BASIC_BLACK}
              />
              <Space width="8px" />
              {item.subPaths.every((subPath) => subPath.lanes[0].issueSummary.length < 1) ? (
                <FontText
                  value={
                    item.totalTime > 60
                      ? Math.floor(item.totalTime / 60) +
                        '시간 ' +
                        (item.totalTime % 60) +
                        '분 소요'
                      : item.totalTime + '분 소요'
                  }
                  textSize="12px"
                  textWeight="Medium"
                  lineHeight="15px"
                  textColor={COLOR.GRAY_999}
                />
              ) : (
                <GrayEllipse>
                  <FontText
                    value={
                      item.totalTime > 60
                        ? Math.floor(item.totalTime / 60) +
                          '시간 ' +
                          (item.totalTime % 60) +
                          '분 이상 예상'
                        : item.totalTime + '분 이상 예상'
                    }
                    textSize="12px"
                    textWeight="Medium"
                    lineHeight="14px"
                    textColor={COLOR.GRAY_999}
                  />
                </GrayEllipse>
              )}
            </TextContainer>
            <Pressable
              hitSlop={20}
              onPress={() => homeNavigation.push('SubwayPathDetail', { state: item })}
            >
              <TextContainer
                onPress={() => homeNavigation.push('SubwayPathDetail', { state: item })}
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
          </TitleContainer>
          {item.subPaths.every((subPath) => subPath.lanes[0].issueSummary.length < 1) && (
            <IssueContainer>
              <FontText
                value="아무런 이슈가 없어요!"
                textSize="13px"
                textWeight="Regular"
                lineHeight="19px"
                textColor={COLOR.GRAY_999}
              />
            </IssueContainer>
          )}
          <SubwaySimplePath
            pathData={item.subPaths}
            arriveStationName={item.lastEndStation}
            betweenPathMargin={24}
          />
          <IssuesBanner subPathss={item.subPaths} />
        </RouteContainer>
      ))}
    </View>
  );
};

export default SavedRouteBox;

const RouteContainer = styled.View`
  padding-bottom: 4px;
`;
const TextContainer = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const BorderContainer = styled.View`
  margin-start: -99px;
`;
const TitleContainer = styled.View`
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;
const IssueContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  margin-top: -10px;
`;
const GrayEllipse = styled.View`
  padding: 4px 6px;
  border-radius: 16px;
  background: #f7f7f9;
`;
