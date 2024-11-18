import { Pressable, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';

import { FontText, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { SubwaySimplePath } from '@/global/components';
import { useGetSearchPaths } from '@/global/apis/hooks';
import { useAppDispatch, useAppSelect } from '@/store';
import { StationDataTypes, getIssueId } from '@/store/modules';
import React from 'react';
import { useHomeNavigation } from '@/navigation/HomeNavigation';
import SwapStation from './components/SwapStation';
import IconRightArrowHead from '@assets/icons/right_arrow_head.svg';
import IconLeftArrowHead from '@assets/icons/left_arrow_head.svg';
import IssueKeywordIcon from '@/global/components/IssueKeywordIcon';
import { subwayLineColor } from '@/global/utils';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { Path } from '@/global/apis/entity';
import LoadingCircle from '@/global/components/animations/LoadingCircle';

dayjs.locale('ko');

export interface SelectedStationTypes {
  departure: StationDataTypes;
  arrival: StationDataTypes;
}

const SearchPathResultScreen = () => {
  const homeNavigation = useHomeNavigation();
  const rootNavigation = useRootNavigation();
  const selectedStationRedux = useAppSelect(({ subwaySearch }) => subwaySearch.selectedStation);
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetSearchPaths({
    params: {
      strStationName: selectedStationRedux.departure.stationName,
      strStationLine: selectedStationRedux.departure.stationLine,
      endStationName: selectedStationRedux.arrival.stationName,
      endStationLine: selectedStationRedux.arrival.stationLine,
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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
      <View style={{ backgroundColor: COLOR.GRAY_F2, flex: 1 }}>
        <View
          style={{
            backgroundColor: COLOR.WHITE,
            flexDirection: 'row',
            paddingTop: 16,
            paddingRight: 16,
            paddingBottom: 15,
            paddingLeft: 22,
            marginBottom: 16,
          }}
        >
          <View style={{ marginTop: 4, marginRight: 16 }}>
            <TouchableOpacity onPress={() => homeNavigation.goBack()}>
              <IconLeftArrowHead color="#3F3F46" />
            </TouchableOpacity>
          </View>
          <SwapStation selectedStation={selectedStationRedux} />
        </View>

        <View
          style={{
            backgroundColor: COLOR.WHITE,
            paddingHorizontal: 16,
            paddingVertical: 14,
            borderBottomColor: COLOR.GRAY_EB,
            borderBottomWidth: 1,
          }}
        >
          <FontText
            text={'오늘 ' + dayjs().format('A HH시 mm분') + ' 기준'}
            className="text-brown-54f"
          />
        </View>
        <ScrollView style={{ backgroundColor: COLOR.WHITE }}>
          {isLoading && (
            <View style={{ marginTop: 100, alignItems: 'center' }}>
              <LoadingCircle width={40} height={40} />
            </View>
          )}
          {data &&
            data.paths.map((item, idx) => (
              <Pressable
                key={item.firstStartStation + item.subPaths.length + idx}
                style={({ pressed }) => ({
                  backgroundColor: pressed ? COLOR.GRAY_E5 : 'transparent',
                  paddingHorizontal: 18,
                  paddingBottom: 24,
                  paddingTop: 20,
                  borderBottomColor: data.paths.length - 1 !== idx ? COLOR.GRAY_EB : 'none',
                  borderBottomWidth: data.paths.length - 1 !== idx ? 1 : 0,
                })}
                onPress={() =>
                  homeNavigation.push('SubwayPathDetail', {
                    state: item,
                  })
                }
              >
                <View style={{ marginBottom: 16 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <FontText
                      text="평균 소요시간"
                      className="text-11 text-gray-999"
                      fontWeight="600"
                    />
                    <View className="flex-row items-center">
                      <FontText text="세부정보" className="text-13 text-gray-999" />
                      <Space width={4} />
                      <IconRightArrowHead color={COLOR.GRAY_999} />
                    </View>
                  </View>
                  <View style={{ height: 4 }} />
                  <FontText text={pathTime(item)} className="text-20" fontWeight="600" />
                </View>

                {/* 지하철 경로 UI */}
                <SubwaySimplePath
                  pathData={item.subPaths}
                  arriveStationName={item.lastEndStation}
                  betweenPathMargin={24}
                />

                <View>
                  {item.subPaths.map((linePath, idx) => {
                    return (
                      <React.Fragment key={linePath.sectionTime + 'subPath' + idx}>
                        {linePath.lanes[0] &&
                          linePath.lanes[0].issueSummary.map(({ keyword, title, id }, innerIdx) => {
                            if (innerIdx > 2) return <></>;
                            return (
                              <TouchableOpacity
                                key={id + title + innerIdx + 'idx' + idx}
                                className="flex-row items-center justify-between px-12 py-8 mb-8 overflow-hidden rounded-full border-gray-beb border-1"
                                onPress={
                                  () => {
                                    dispatch(getIssueId(id));
                                    rootNavigation.navigate('IssueStack', {
                                      screen: 'IssueDetail',
                                    });
                                  }
                                  // homeNavigation.navigate('SubwayPathDetail', { state: item })
                                }
                              >
                                <IssueKeywordIcon
                                  width={24}
                                  height={24}
                                  keyword={keyword}
                                  color={subwayLineColor(linePath.lanes[0].stationCode)}
                                />
                                <FontText
                                  text={title}
                                  className="flex-1 ml-10 mr-10 text-13"
                                  fontWeight="600"
                                  numberOfLines={1}
                                />
                                <IconRightArrowHead width={8} height={8} color={COLOR.GRAY_999} />
                              </TouchableOpacity>
                            );
                          })}
                      </React.Fragment>
                    );
                  })}
                </View>
              </Pressable>
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchPathResultScreen;
