import React from 'react';
import { View } from 'react-native';
import { IconButton, FontText, TextButton } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useGetSavedRoutesQuery } from '@/global/apis/hook';
import styled from '@emotion/native';
import { SubwaySimplePath } from '@/global/components';

interface RenderSavedRoutesProps {
  id: number;
  roadName: string;
  stations: [];
}

const SavedRouteBox = () => {
  const { data: savedRoutes } = useGetSavedRoutesQuery();
  const isRoutesExist = savedRoutes && savedRoutes.length > 0;
  const renderSavedRoute = ({ id, roadName, stations }: RenderSavedRoutesProps) => {
    console.log(stations);
    return (
      <RouteContainer key={id}>
        <TextContainer>
          <TextContainer>
            <FontText
              value={`${roadName}  `}
              textSize="18px"
              textWeight="SemiBold"
              lineHeight="23px"
              textColor={COLOR.BASIC_BLACK}
            />
            <GrayEllipse>
              <FontText
                value={`${roadName}분 이상 예상`}
                textSize="12px"
                textWeight="Medium"
                lineHeight="14px"
                textColor={COLOR.GRAY_999}
              />
            </GrayEllipse>
          </TextContainer>
          <TextContainer>
            <TextButton
              value="세부정보  "
              textSize="13px"
              textWeight="Regular"
              lineHeight="19px"
              textColor={COLOR.GRAY_999}
              // onPress={() => showPathDetail(id)}
            />
            <IconButton
              isFontIcon={false}
              imagePath="more_gray"
              iconWidth="4.5px"
              iconHeight="8px"
            />
          </TextContainer>
        </TextContainer>
        {/* <SubwaySimplePath
          pathData={stations}
          arriveStationName={'a'}
          // arriveStationName={roadName}
          betweenPathMargin={24}
        /> */}
        <BorderLine />
      </RouteContainer>
    );
  };

  if (isRoutesExist) {
    return <View>{savedRoutes?.map(renderSavedRoute)}</View>;
  } else {
    return (
      <FontText
        value="저장한 경로가 없어요"
        textSize="16px"
        textWeight="Medium"
        lineHeight="500px"
        textColor={COLOR.GRAY_999}
        textAlign="center"
      />
    );
  }
};

export default SavedRouteBox;

const BorderLine = styled.View`
  borderwidth: 1px;
  bordercolor: ${COLOR.GRAY_F9};
  width: 999px;
  marginstart: -99px;
  margintop: 30px;
`;
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
