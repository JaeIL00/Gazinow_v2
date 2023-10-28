import styled from '@emotion/native';
import Icon from 'react-native-vector-icons/Feather';

import { FontText } from '@/components/common/atoms';
import { COLOR } from '@/constants';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { useAppDispatch, useAppSelect } from '@/store';
import { getSeletedStation } from '@/store/modules';
import type { SubwayPublicDataTypes } from '@/types/apis';

const SearchResultList = () => {
  const rootNavigation = useRootNavigation();
  const dispatch = useAppDispatch();
  const {
    searchResult: resultData,
    stationType,
    selectedStation,
  } = useAppSelect(({ subwaySearch }) => subwaySearch);

  const saveStationData = (data: SubwayPublicDataTypes) => {
    if (stationType) {
      const freshData = {
        name: data.STATION_NM,
        code: data.STATION_CD,
      };
      dispatch(
        getSeletedStation({
          actionType: stationType === '출발역' ? 'departure' : 'arrival',
          stationData: freshData,
        }),
      );
      selectedStation.departure.name || selectedStation.arrival.name
        ? console.log('경로 검색 화면 이동')
        : rootNavigation.pop();
    }
  };

  return (
    <Container>
      <Header>
        <FontText
          value="최근검색"
          textSize="14px"
          textWeight="Regular"
          lineHeight="24px"
          textColor="#757575"
        />
      </Header>

      <Ul>
        {resultData.map((station) => (
          <Li key={station.STATION_CD} onPress={() => saveStationData(station)}>
            <Icon name="clock" size={25} color={COLOR.BE_GRAY} />
            <StationInfoBox>
              <FontText
                value={station.STATION_NM}
                textSize="16px"
                textWeight="Medium"
                lineHeight="21px"
                textColor="#000"
              />
              <FontText
                value={station.LINE_NUM}
                textSize="14px"
                textWeight="Regular"
                lineHeight="21px"
                textColor={COLOR.GRAY_999}
              />
            </StationInfoBox>
          </Li>
        ))}
      </Ul>
    </Container>
  );
};

export default SearchResultList;

const Container = styled.View`
  flex: 1;
`;
const Header = styled.View`
  padding-left: 16px;
  margin-top: 18px;
`;
const Ul = styled.ScrollView`
  margin-top: 6px;
`;
const Li = styled.Pressable`
  flex-direction: row;
  gap: 7px;
  padding: 12px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #ebebeb;
`;
const StationInfoBox = styled.View`
  gap: 2.95px;
`;
