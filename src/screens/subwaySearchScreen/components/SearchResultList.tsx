import styled from '@emotion/native';
import Icon from 'react-native-vector-icons/Feather';

import { iconPath } from '@/assets/icons/iconPath';
import { FontText } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { useSearchNavigation } from '@/navigation/SearchNavigation';
import { useAppDispatch, useAppSelect } from '@/store';
import { getSeletedStation } from '@/store/modules';
import { useAddResetSearch, useSearchSubwayName } from '@/hooks/queries/searchQuery';
import { getSearchText } from '@/store/modules/subwaySearchModule';
import { SearchSubwayNameTypes } from '@/global/types/apis/searchTypes';

interface SearchResultListProps {
  historyList: SearchSubwayNameTypes;
}

const SearchResultList = ({ historyList }: SearchResultListProps) => {
  const rootNavigation = useRootNavigation();
  const searchNavigation = useSearchNavigation();
  const dispatch = useAppDispatch();
  const { searchText, stationType, selectedStation } = useAppSelect(
    ({ subwaySearch }) => subwaySearch,
  );

  const { searchResultData } = useSearchSubwayName(searchText);
  const { addRecentMutate } = useAddResetSearch({
    onSuccess: (data) => {
      saveStationData({
        name: data.stationName,
        line: data.stationLine,
      });
    },
  });

  const saveStationData = (data: { name: string; line: string }) => {
    dispatch(getSearchText(''));
    if (stationType === '출발역') {
      dispatch(
        getSeletedStation({
          actionType: 'departure',
          stationData: data,
        }),
      );
      selectedStation.arrival.name
        ? searchNavigation.navigate('SubwayPathResult', {
            departure: data,
            arrival: selectedStation.arrival,
          })
        : rootNavigation.pop();
    } else if (stationType === '도착역') {
      dispatch(
        getSeletedStation({
          actionType: 'arrival',
          stationData: data,
        }),
      );
      selectedStation.departure.name
        ? searchNavigation.navigate('SubwayPathResult', {
            departure: selectedStation.departure,
            arrival: data,
          })
        : rootNavigation.pop();
    }
  };

  const subwayBtnHandler = ({ stationName, stationLine }: (typeof searchResultData)[0]) => {
    addRecentMutate({ stationName, stationLine });
  };

  // 입력어가 없으면 최근검색
  if (!searchText) {
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

        <Ul marginTop="18px">
          {historyList.data.map((history) => (
            <Li
              key={history.id}
              onPress={() =>
                saveStationData({
                  name: history.stationName,
                  line: history.stationLine,
                })
              }
            >
              <Icon name="clock" size={25} color={COLOR.BE_GRAY} />
              <StationInfoBox>
                <FontText
                  value={history.stationName}
                  textSize="16px"
                  textWeight="Medium"
                  lineHeight="21px"
                  textColor="#000"
                />
                <FontText
                  value={history.stationLine}
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
  }

  return (
    <Container>
      {/* 입력어가 있고 && 검색 결과가 있으면 결과 표시 */}
      {/* 입력어가 있고 && 검색 결과가 없으면 없음 표시 */}
      <Ul marginTop="28px">
        {searchResultData.map(({ stationLine, stationName }, idx) => (
          <Li key={idx} onPress={() => subwayBtnHandler({ stationLine, stationName })}>
            <LocateIcon source={iconPath['location_pin_gray']} width={25} height={25} />
            <StationInfoBox>
              <FontText
                value={stationName}
                textSize="16px"
                textWeight="Medium"
                lineHeight="21px"
                textColor="#000"
              />
              <FontText
                value={stationLine}
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
const Ul = styled.ScrollView<{ marginTop: string }>`
  margin-top: ${({ marginTop }) => marginTop};
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
const LocateIcon = styled.Image`
  width: 25px;
  height: 25px;
`;
