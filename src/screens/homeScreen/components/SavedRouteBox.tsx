import React, { useState } from 'react';
import { View } from 'react-native';
import { IconButton, FontText, TextButton, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useGetSavedRoutesQuery } from '@/global/apis/hook';
import styled from '@emotion/native';
import { SubwaySimplePath } from '@/global/components';
import { SavedRoute } from '@/global/apis/entity';
import NewRouteDetailModal from '@/screens/savedRoutesScreen/components/NewRouteDetailModal';

const SavedRouteBox = () => {
  const { data: savedRoutes } = useGetSavedRoutesQuery();
  const isRoutesExist = savedRoutes && savedRoutes.length > 0;

  // 각 아이템의 모달 열림 상태를 관리하는 배열
  const [isOpenModalByIndex, setIsOpenModalByIndex] = useState<boolean[]>(
    new Array(savedRoutes?.length).fill(false),
  );

  const showPathDetail = (index: number) => {
    // 인덱스에 해당하는 아이템의 모달 열림 상태를 변경
    const newModalStates = isOpenModalByIndex.map((state, i) => i === index);
    setIsOpenModalByIndex(newModalStates);
  };

  const renderSavedRoutes = () =>
    savedRoutes?.map((item: SavedRoute, index: number) => (
      <RouteContainer key={item.id}>
        {index !== 0 && (
          <BorderContainer>
            <Space height="1px" width="999px" backgroundColor={COLOR.GRAY_EB} />
          </BorderContainer>
        )}
        <TitleContainer>
          <TextContainer>
            <FontText
              value={`${item.roadName}  `}
              textSize="18px"
              textWeight="Bold"
              lineHeight="23px"
              textColor={COLOR.BASIC_BLACK}
            />
            <FontText
              value={`${item.totalTime}분 소요`}
              textSize="12px"
              textWeight="Medium"
              lineHeight="15px"
              textColor={COLOR.GRAY_999}
            />
          </TextContainer>
          <TextContainer>
            <TextButton
              value="세부정보  "
              textSize="13px"
              textWeight="Regular"
              lineHeight="19px"
              textColor={COLOR.GRAY_999}
              onPress={() => showPathDetail(index)}
            />
            <IconButton
              isFontIcon={false}
              imagePath="more_gray"
              iconWidth="4.5px"
              iconHeight="8px"
            />
          </TextContainer>
        </TitleContainer>
        <SubwaySimplePath
          pathData={item.subPaths}
          arriveStationName={item.lastEndStation}
          betweenPathMargin={24}
        />
        {isOpenModalByIndex[index] && (
          <NewRouteDetailModal
            item={item}
            setIsNewRouteDetailModalOpened={(isOpen: boolean) => {
              const newModalStates = isOpenModalByIndex.map((state, i) =>
                i === index ? isOpen : state,
              );
              setIsOpenModalByIndex(newModalStates);
            }}
          />
        )}
      </RouteContainer>
    ));

  if (isRoutesExist) {
    return <View>{renderSavedRoutes()}</View>;
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

const RouteContainer = styled.View`
  padding-bottom: 4px;
`;
const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const BorderContainer = styled.View`
  margin-start: -99px;
`;
const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  margin-top: 20px;
`;
