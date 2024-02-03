import styled from '@emotion/native';
import Icon from 'react-native-vector-icons/Feather';

import { iconPath } from '@/assets/icons/iconPath';
import { FontText } from '@/global/ui';
import { COLOR, SUBWAY_PATH_RESULT } from '@/global/constants';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { useAppDispatch, useAppSelect } from '@/store';
import { getSeletedStation } from '@/store/modules';
import { getSearchText } from '@/store/modules/subwaySearchModule';
import { useAddRecentSearch, useSearchStationName } from '@/global/apis/hook';
import { SearchHistoryStationNameTypes, SubwayLine } from '@/global/apis/entity';
import { useMemo } from 'react';
import { useHomeNavigation } from '@/navigation/HomeNavigation';

interface SearchResultListProps {
  historyList: SearchHistoryStationNameTypes[];
}

const SearchResultList = ({ historyList }: SearchResultListProps) => {
  const rootNavigation = useRootNavigation();
  const homeNavigation = useHomeNavigation();
  const dispatch = useAppDispatch();
  const { searchText, stationType, selectedStation } = useAppSelect(
    ({ subwaySearch }) => subwaySearch,
  );

  const { searchResultData } = useSearchStationName(searchText);
  const { addRecentMutate } = useAddRecentSearch({
    onSuccess: ({ stationLine, stationName }) => {
      saveStationData({
        stationName,
        stationLine,
      });
    },
  });

  const saveStationData = (data: { stationName: string; stationLine: SubwayLine }) => {
    dispatch(getSearchText(''));
    if (stationType === '출발역') {
      if (selectedStation.arrival.stationName === data.stationName) {
        dispatch(
          getSeletedStation({
            actionType: 'arrival',
            stationData: {
              stationLine: null,
              stationName: '',
            },
          }),
        );
        dispatch(
          getSeletedStation({
            actionType: 'departure',
            stationData: data,
          }),
        );
        rootNavigation.pop();
        return;
      }
      dispatch(
        getSeletedStation({
          actionType: 'departure',
          stationData: data,
        }),
      );
      selectedStation.arrival.stationName
        ? homeNavigation.navigate(SUBWAY_PATH_RESULT)
        : rootNavigation.pop();
    } else if (stationType === '도착역') {
      if (selectedStation.departure.stationName === data.stationName) {
        dispatch(
          getSeletedStation({
            actionType: 'departure',
            stationData: {
              stationLine: null,
              stationName: '',
            },
          }),
        );
        dispatch(
          getSeletedStation({
            actionType: 'arrival',
            stationData: data,
          }),
        );
        rootNavigation.pop();
        return;
      }
      dispatch(
        getSeletedStation({
          actionType: 'arrival',
          stationData: data,
        }),
      );
      selectedStation.departure.stationName
        ? homeNavigation.navigate(SUBWAY_PATH_RESULT)
        : rootNavigation.pop();
    }
  };

  const stationBtnHandler = ({ stationName, stationLine }: (typeof searchResultData)[0]) => {
    if (!stationLine) return;
    addRecentMutate({ stationName, stationLine });
  };

  // 입력어가 없으면 최근검색
  if (!searchText) {
    return (
      <ResultContainer>
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
          {historyList.map(({ id, stationName, stationLine }) => (
            <Li
              key={id}
              onPress={() =>
                stationBtnHandler({
                  stationName,
                  stationLine,
                })
              }
            >
              <Icon name="clock" size={25} color={COLOR.GRAY_BE} />
              <StationInfoBox>
                <FontText
                  value={stationName}
                  textSize="16px"
                  textWeight="Medium"
                  lineHeight="21px"
                  textColor="#000"
                />
                <FontText
                  value={stationLine!}
                  textSize="14px"
                  textWeight="Regular"
                  lineHeight="21px"
                  textColor={COLOR.GRAY_999}
                />
              </StationInfoBox>
            </Li>
          ))}
        </Ul>
      </ResultContainer>
    );
  }

  return (
    <ResultContainer>
      {/* 입력어가 있고 && 검색 결과가 있으면 결과 표시 */}
      {/* 입력어가 있고 && 검색 결과가 없으면 없음 표시 */}
      <Ul marginTop="28px">
        {searchResultData.map(({ stationName, stationLine }, idx) => (
          <Li key={idx} onPress={() => stationBtnHandler({ stationLine, stationName })}>
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
                value={stationLine!}
                textSize="14px"
                textWeight="Regular"
                lineHeight="21px"
                textColor={COLOR.GRAY_999}
              />
            </StationInfoBox>
          </Li>
        ))}
      </Ul>
    </ResultContainer>
  );
};

export default SearchResultList;

const ResultContainer = styled.View`
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
