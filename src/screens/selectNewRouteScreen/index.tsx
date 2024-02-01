import styled, { css } from '@emotion/native';
import { Pressable, ScrollView, View } from 'react-native';
import { FontText, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import {
  EDIT_ROUTE_NAVIGATION,
  NAME_NEW_ROUTE,
  SUBWAY_PATH_DETAIL,
} from '@/global/constants/navigation';
import React, { useState } from 'react';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { SubwaySimplePath, SwapSubwayStation } from '@/global/components';
import { StationDataTypes } from '@/store/modules';
import { useGetSearchPaths } from '@/global/apis/hook';
import { useRoute } from '@react-navigation/native';

const SelectNewRouteScreen = () => {
  const navigation = useRootNavigation();
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number | null>(null);
  console.log('selectedRouteIndex: ', selectedRouteIndex);

  const { params } = useRoute() as {
    params: {
      departure: StationDataTypes;
      arrival: StationDataTypes;
    };
  };

  const { data } = useGetSearchPaths({
    strStationName: params.departure.stationName,
    strStationLine: params.departure.stationLine,
    endStationName: params.arrival.stationName,
    endStationLine: params.arrival.stationLine,
  });

  return (
    <Container>
      <SwapSubwayBox>
        <Container>
          <SwapSubwayStation isWrap={false} showHeader={true} />
        </Container>
      </SwapSubwayBox>
      <SubPathContainer>
        <ScrollView>
          {data?.paths.map((item) => (
            <PathInner
              key={item.firstStartStation + item.totalTime}
              onPress={() => {
                navigation.navigate(EDIT_ROUTE_NAVIGATION, {
                  screen: SUBWAY_PATH_DETAIL,
                  params: { pathId: selectedRouteIndex },
                });
              }}
            >
              <PathTitleInfoBox>
                <View>
                  <FontText
                    value="평균 소요시간"
                    textSize="11px"
                    textWeight="SemiBold"
                    lineHeight="13px"
                    textColor="#999"
                  />
                  <Space height="4px" />
                  <FontText
                    value={`${item.totalTime}분`}
                    textSize="20px"
                    textWeight="SemiBold"
                    lineHeight="25px"
                    textColor={COLOR.BASIC_BLACK}
                  />
                </View>
                <RadioButtonContainer
                  selected={selectedRouteIndex === item.totalTime}
                  onPress={() => setSelectedRouteIndex(item.totalTime)}
                >
                  {selectedRouteIndex === item.totalTime && <InnerCircle />}
                </RadioButtonContainer>
              </PathTitleInfoBox>
              <SubwaySimplePath pathData={item.subPaths} />
            </PathInner>
          ))}
        </ScrollView>
      </SubPathContainer>

      <BottomBtn
        onPress={() => {
          navigation.navigate(EDIT_ROUTE_NAVIGATION, {
            screen: NAME_NEW_ROUTE,
            params: { pathId: selectedRouteIndex },
          });
        }}
        disabled={selectedRouteIndex === null}
      >
        <FontText
          value="다음"
          textSize="17px"
          textWeight="SemiBold"
          textColor={COLOR.WHITE}
          lineHeight="26px"
        />
      </BottomBtn>
    </Container>
  );
};

export default SelectNewRouteScreen;

const Container = styled.View`
  background-color: ${COLOR.WHITE};
  flex: 1;
`;
const SubPathContainer = styled.View`
  padding-bottom: 30px;
  flex: 1;
`;
const SwapSubwayBox = styled.View`
  background-color: ${COLOR.WHITE};
  flex-direction: row;
  padding: 30px 16px 45px 22px;
  border-bottom-color: #ebebeb;
  border-bottom-width: 1px;
`;
const PathTitleInfoBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const PathInner = styled.Pressable`
  padding: 20px 16px 24px;
  border-bottom-color: #ebebeb;
  border-bottom-width: 1px;
`;
const RadioButtonContainer = styled(Pressable)<{ selected?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border-width: 2px;
  border-color: gray;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.selected &&
    css`
      border-color: blue;
    `}
`;
const InnerCircle = styled.View`
  width: 11px;
  height: 11px;
  border-radius: 6px;
  background-color: blue;
`;
const BottomBtn = styled.Pressable`
  padding-vertical: 11px;
  margin-horizontal: 16px;
  border-radius: 5px;
  align-items: center;
  bottom: 41px;
  ${({ disabled }) =>
    disabled ? `background-color : #dddddd` : `background-color : ${COLOR.BASIC_BLACK};`}
`;
