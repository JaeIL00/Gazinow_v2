import styled from '@emotion/native';
import { useRoute } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';

import { FontText, IconButton, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useSearchPaths } from '@/hooks';
import { StationDataTypes } from '@/store/modules';
import { iconPath } from '@/assets/icons/iconPath';
import { useRootNavigation } from '@/navigation/RootNavigation';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { SubwaySimplePath, SwapSubwayStation } from '@/global/components';

dayjs.locale('ko');

const SearchPathResultScreen = () => {
  const rootNavigation = useRootNavigation();
  const { params } = useRoute() as {
    params: {
      departure: StationDataTypes;
      arrival: StationDataTypes;
    };
  };

  const { data } = useSearchPaths({
    strSubwayName: params.departure.name,
    strSubwayLine: params.departure.line,
    endSubwayName: params.arrival.name,
    endSubwayLine: params.arrival.line,
  });

  return (
    <Container>
      <SwapSubwayBox>
        <LeftIconBox>
          <IconButton
            isFontIcon={false}
            imagePath="left_arrow_nonbar"
            iconWidth="9px"
            iconHeight="16px"
            onPress={() => rootNavigation.replace('MainBottomTab', { screen: 'Home' })}
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

      <View style={{ backgroundColor: COLOR.WHITE }}>
        {data?.paths.map((item) => (
          <View
            key={item.firstStartStation + item.totalTime}
            style={{ paddingHorizontal: 18, paddingBottom: 24, paddingTop: 20 }}
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
                    rootNavigation.push('SearchNavigation', {
                      screen: 'SubwayPathDetail',
                      params: item,
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
            <SubwaySimplePath pathData={item.subPaths} />
          </View>
        ))}
      </View>
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
