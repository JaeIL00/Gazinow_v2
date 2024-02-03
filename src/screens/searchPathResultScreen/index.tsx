import styled from '@emotion/native';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { FontText, IconButton, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { iconPath } from '@/assets/icons/iconPath';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { SubwaySimplePath, SwapSubwayStation } from '@/global/components';
import { useGetSearchPaths } from '@/global/apis/hook';
import { useAppDispatch, useAppSelect } from '@/store';
import { changeIsSearchedPath } from '@/store/modules';
import { useEffect } from 'react';
import { useHomeNavigation } from '@/navigation/HomeNavigation';

dayjs.locale('ko');

const SearchPathResultScreen = () => {
  const homeNavigation = useHomeNavigation();
  const dispatch = useAppDispatch();

  const { arrival, departure } = useAppSelect(({ subwaySearch }) => subwaySearch.selectedStation);

  const { data } = useGetSearchPaths({
    strStationName: departure.stationName,
    strStationLine: departure.stationLine,
    endStationName: arrival.stationName,
    endStationLine: arrival.stationLine,
  });

  useEffect(() => {
    dispatch(changeIsSearchedPath(true));
  }, []);

  return (
    <Container>
      <SwapSubwayBox>
        <LeftIconBox>
          <IconButton
            isFontIcon={false}
            imagePath="left_arrow_nonbar"
            iconWidth="9px"
            iconHeight="16px"
            onPress={() => homeNavigation.goBack()}
          />
        </LeftIconBox>
        <SwapSubwayWrap>
          <SwapSubwayStation isWrap={false} />
        </SwapSubwayWrap>
      </SwapSubwayBox>

      <View
        style={{
          backgroundColor: COLOR.WHITE,
          paddingHorizontal: 16,
          paddingVertical: 14,
          borderBottomColor: '#EBEBEB',
          borderBottomWidth: 1,
        }}
      >
        <FontText
          value={'오늘 ' + dayjs().format('A HH시 mm분') + ' 기준'}
          textSize="16px"
          textWeight="Regular"
          textColor="#49454F"
        />
      </View>

      <ScrollView style={{ backgroundColor: COLOR.WHITE }}>
        {data?.paths.map((item, idx) => (
          <View
            key={item.firstStartStation + item.totalTime}
            style={{
              paddingHorizontal: 18,
              paddingBottom: 24,
              paddingTop: 20,
              borderBottomColor: data.paths.length - 1 !== idx ? '#EBEBEB' : 'none',
              borderBottomWidth: data.paths.length - 1 !== idx ? 1 : 0,
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <FontText
                  value="평균 소요시간"
                  textSize="11px"
                  textWeight="SemiBold"
                  textColor="#999"
                />
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() =>
                    homeNavigation.push('SubwayPathDetail', {
                      state: item,
                    })
                  }
                >
                  <FontText
                    value="세부정보"
                    textSize="13px"
                    textWeight="Regular"
                    textColor="#999"
                  />
                  <Space width="4px" />
                  <MoreIcon source={iconPath['right_arrow_nonbar']} />
                </TouchableOpacity>
              </View>
              <View style={{ height: 4 }} />
              <FontText
                value={
                  item.totalTime > 60
                    ? Math.floor(item.totalTime / 60) + '시간 ' + (item.totalTime % 60) + '분 이상'
                    : item.totalTime + '분 이상'
                }
                textSize="20px"
                textWeight="SemiBold"
                textColor={COLOR.BASIC_BLACK}
              />
            </View>

            {/* 지하철 경로 UI */}
            <SubwaySimplePath
              pathData={item.subPaths}
              arriveStationName={item.lastEndStation}
              betweenPathMargin={24}
            />
          </View>
        ))}
      </ScrollView>
    </Container>
  );
};

export default SearchPathResultScreen;

const Container = styled.View`
  flex: 1;
`;
const SwapSubwayBox = styled.View`
  background-color: ${COLOR.WHITE};
  flex-direction: row;
  padding: 30px 16px 21px 22px;
  margin-bottom: 17px;
`;
const LeftIconBox = styled.View`
  margin-top: 13px;
  margin-right: 16px;
`;
const SwapSubwayWrap = styled.View`
  flex: 1;
`;
const DetailButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;
const MoreIcon = styled.Image`
  width: 4.5px;
  height: 8px;
`;
const PathInner = styled.View`
  padding: 20px 16px 24px;
`;
