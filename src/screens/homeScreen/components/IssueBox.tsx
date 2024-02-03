import React from 'react';
import { IconButton, FontText } from '@/global/ui';
import { COLOR } from '@/global/constants';
import IssuesBanner from './IssuesBanner';
import RecommendedRoutes from './RecommendedRoutes';
import styled from '@emotion/native';
import { useGetSavedRoutesQuery } from '@/global/apis/hook';

const IssueBox = () => {
  const { data: savedRoutes } = useGetSavedRoutesQuery();
  const isRoutesExist = savedRoutes && savedRoutes.length > 0;
  
  if (isRoutesExist) {
    return (
      <RouteContainer>
        <TextContainer>
          <TextContainer>
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
          </TextContainer>
          <TextContainer>
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
          </TextContainer>
        </TextContainer>
        {/* <View style={styles.containerSubwayRoute}>
          <SubwayRoute />
        </View> */}
        <IssuesBanner />
        <RecommendedRoutes />
      </RouteContainer>
    );
  } else {
    return (
      <FontText
        value="저장한 경로에 이슈가 없어요."
        textSize="16px"
        textWeight="Medium"
        lineHeight="500px"
        textColor={COLOR.GRAY_999}
        textAlign="center"
      />
    );
  }
};

export default IssueBox;

const RouteContainer = styled.View`
  margin-top: 20px;
`;
const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const GrayEllipse = styled.View`
  padding: 4px 6px;
  border-radius: 16px;
  background: #f7f7f9;
`;
