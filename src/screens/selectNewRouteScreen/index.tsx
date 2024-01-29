import styled, { css } from '@emotion/native';
import { Pressable, View } from 'react-native';
import { FontText, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import {
  EDIT_ROUTE_NAVIGATION,
  NAME_NEW_ROUTE,
  SUBWAY_PATH_DETAIL,
} from '@/global/constants/navigation';
import React, { useState } from 'react';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { SwapSubwayStation } from '@/global/components';
import SubwayRoute from './components/SubwayRoute';

const dummy = [
  { time: '45분', departureName: '신용산역', departureLine: '4', arrivalLine: '2' },
  { time: '45분', departureName: '신용산역', departureLine: '4', arrivalLine: '2' },
];

const SelectNewRouteScreen = () => {
  const navigation = useRootNavigation();
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number | null>(null);
  console.log('selectedRouteIndex: ', selectedRouteIndex);

  return (
    <Container>
      <SwapSubwayBox>
        <Container>
          <SwapSubwayStation isWrap={false} showHeader={true} />
        </Container>
      </SwapSubwayBox>
      <Container>
        <View>
          {dummy.map((item, index) => (
            <PathInner
              key={index}
              onPress={() => {
                navigation.navigate(EDIT_ROUTE_NAVIGATION, {
                  screen: SUBWAY_PATH_DETAIL,
                  params: { pathId: selectedRouteIndex },
                });
              }}
            >
              <View>
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
                      value={item.time}
                      textSize="20px"
                      textWeight="SemiBold"
                      lineHeight="25px"
                      textColor={COLOR.BASIC_BLACK}
                    />
                  </View>
                  <RadioButtonContainer
                    selected={selectedRouteIndex === index}
                    onPress={() => setSelectedRouteIndex(index)}
                  >
                    {selectedRouteIndex === index && <InnerCircle />}
                  </RadioButtonContainer>
                </PathTitleInfoBox>
                <SubwayRouteContainer>
                  <SubwayRoute />
                </SubwayRouteContainer>
              </View>
              {/* 경로 그래프 */}
            </PathInner>
          ))}
        </View>
      </Container>

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

const SubwayRouteContainer = styled.View`
  margin-top: 40px;
  flex-direction: row;
  justify-content: space-between;
`;
const Container = styled.View`
  background-color: ${COLOR.WHITE};
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
