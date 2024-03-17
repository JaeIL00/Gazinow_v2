import styled, { css } from '@emotion/native';
import { Pressable, ScrollView, View } from 'react-native';
import { FontText, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { SubwaySimplePath } from '@/global/components';
import { useGetSearchPaths } from '@/global/apis/hooks';
import { useState } from 'react';
import { Path } from '@/global/apis/entity';
import { StationDataTypes } from '@/store/modules';
import AddNewRouteHeader from './AddNewRouteHeader';
import { useNewRouteNavigation } from '@/navigation/NewRouteNavigation';
import { useAppSelect } from '@/store';
import SwapStation from './SwapStation';

interface SelectedStationTypes {
  departure: StationDataTypes;
  arrival: StationDataTypes;
}

const SelectNewRouteModal = () => {
  const newRouteNavigation = useNewRouteNavigation();
  const selectedStationRedux = useAppSelect(({ subwaySearch }) => subwaySearch.selectedStation);
  const [selectedRoutePath, setSelectedRoutePath] = useState<Path | null>(null);

  const [selectedStation, setSelectedStation] =
    useState<SelectedStationTypes>(selectedStationRedux);

  const { data } = useGetSearchPaths({
    params: {
      strStationName: selectedStation.departure.stationName,
      strStationLine: selectedStation.departure.stationLine,
      endStationName: selectedStation.arrival.stationName,
      endStationLine: selectedStation.arrival.stationLine,
    },
    enabled:
      !!selectedStationRedux.departure.stationName &&
      !!selectedStationRedux.departure.stationLine &&
      !!selectedStationRedux.arrival.stationName &&
      !!selectedStationRedux.arrival.stationLine,
  });

  const pathTime = (item: Path) => {
    const hasIssue = item.subPaths.some(
      (sub) => !!sub.lanes[0] && !!sub.lanes[0].issueSummary.length,
    );
    const minute = hasIssue ? '분 이상' : '분';
    return item.totalTime > 60
      ? Math.floor(item.totalTime / 60) + '시간 ' + (item.totalTime % 60) + minute
      : item.totalTime + minute;
  };

  return (
    <Container>
      <AddNewRouteHeader />
      <SubPathContainer>
        <View
          style={{
            backgroundColor: COLOR.WHITE,
            paddingTop: 20,
            paddingBottom: 45,
            marginHorizontal: 16,
          }}
        >
          <SwapStation selectedStation={selectedStation} setSelectedStation={setSelectedStation} />
        </View>
        <ScrollView>
          {data?.paths.map((item) => {
            return (
              <PathInner
                key={item.firstStartStation + item.totalTime}
                onPress={() => {
                  setSelectedRoutePath(item);
                  newRouteNavigation.push('Detail', {
                    state: item,
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
                      value={pathTime(item)}
                      textSize="20px"
                      textWeight="SemiBold"
                      lineHeight="25px"
                      textColor={COLOR.BASIC_BLACK}
                    />
                  </View>
                  <Pressable
                    hitSlop={20}
                    onPress={() => {
                      setSelectedRoutePath(item);
                    }}
                  >
                    <RadioButtonContainer
                      selected={selectedRoutePath === item}
                      onPress={() => {
                        setSelectedRoutePath(item);
                      }}
                    >
                      {selectedRoutePath === item && <InnerCircle />}
                    </RadioButtonContainer>
                  </Pressable>
                </PathTitleInfoBox>
                <SubwaySimplePath
                  pathData={item.subPaths}
                  arriveStationName={item.lastEndStation}
                  betweenPathMargin={24}
                />
              </PathInner>
            );
          })}
          <Space height="1px" backgroundColor={COLOR.GRAY_EB} />
        </ScrollView>
      </SubPathContainer>

      <BottomBtn
        onPress={() =>
          newRouteNavigation.push('Name', {
            state: selectedRoutePath!,
          })
        }
        disabled={selectedRoutePath === null}
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

export default SelectNewRouteModal;

const Container = styled.SafeAreaView`
  background-color: ${COLOR.WHITE};
  flex: 1;
`;
const SubPathContainer = styled.View`
  padding-bottom: 30px;
  flex: 1;
`;
const PathTitleInfoBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 8px;
`;
const PathInner = styled.Pressable`
  padding: 20px 16px 8px;
  border-top-color: ${COLOR.GRAY_EB};
  border-top-width: 1px;
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
