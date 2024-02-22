import styled from '@emotion/native';
import Icon from 'react-native-vector-icons/Feather';
import { FontText, Input } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useAppDispatch, useAppSelect } from '@/store';
import { getSearchText, getSeletedStation } from '@/store/modules/stationSearchModule';
import { useAddRecentSearch, useGetSearchHistory, useSearchStationName } from '@/global/apis/hook';
import { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { SelectedStationTypes } from './NewSearchSwapStation';
import IconXCircleFill from '@assets/icons/x_circle_fill.svg';
import { Pressable, SafeAreaView } from 'react-native';
import { subwayReturnLineName } from '@/global/utils/subwayLine';
import IconLocationPin from '@assets/icons/location_pin.svg';
import AddNewRouteHeader from './AddNewRouteHeader';
import { useNewRouteNavigation } from '@/navigation/NewRouteNavigation';

const NewSearchStation = () => {
  const newRouteNavigation = useNewRouteNavigation();
  const dispatch = useAppDispatch();
  const { selectedStation, stationType } = useAppSelect((state) => state.subwaySearch);

  const { historyData } = useGetSearchHistory();

  const [searchTextValue, setSearchTextValue] = useState<string>('');

  const changeSearchText = (text: string) => {
    setSearchTextValue(text);
    sendSearchText(text);
  };

  const sendSearchText = useCallback(
    debounce((text: string) => {
      dispatch(getSearchText(text));
    }, 500),
    [],
  );

  const { searchResultData } = useSearchStationName(searchTextValue);
  const { addRecentMutate } = useAddRecentSearch({
    onSuccess: ({ stationLine, stationName }) => {
      const key = stationType === '출발역' ? 'departure' : 'arrival';
      dispatch(
        getSeletedStation({
          ...selectedStation,
          [key]: {
            stationLine,
            stationName,
          },
        }),
      );
      if (
        (key === 'departure' && selectedStation.arrival.stationName) ||
        (key === 'arrival' && selectedStation.departure.stationName)
      ) {
        newRouteNavigation.push('Result');
      } else newRouteNavigation.goBack();
    },
  });

  const stationBtnHandler = ({ stationName, stationLine }: (typeof searchResultData)[0]) => {
    if (!stationLine) return;
    addRecentMutate({ stationName, stationLine: subwayReturnLineName(stationLine) });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
      <AddNewRouteHeader />
      <Container>
        <SearchInput
          value={searchTextValue}
          placeholder={`${stationType}을 검색해보세요`}
          placeholderTextColor={COLOR.GRAY_BE}
          inputMode="search"
          onChangeText={changeSearchText}
          autoFocus
          isSavingNewRoute
        />
        <Pressable hitSlop={20} onPress={() => setSearchTextValue('')}>
          <IconXCircleFill width={19.5} />
        </Pressable>
      </Container>
      {!searchTextValue ? (
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
            {historyData?.map(({ stationName, stationLine }) => (
              <Li
                key={stationName}
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
      ) : (
        <ResultContainer>
          {/* 입력어가 있고 && 검색 결과가 있으면 결과 표시 */}
          {/* 입력어가 있고 && 검색 결과가 없으면 없음 표시 */}
          <Ul marginTop="28px">
            {searchResultData.map(({ stationName, stationLine }, idx) => (
              <Li key={idx} onPress={() => stationBtnHandler({ stationLine, stationName })}>
                <IconLocationPin />
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
      )}
    </SafeAreaView>
  );
};

export default NewSearchStation;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 28px;
  border: 1px solid #d4d4d4;
  padding: 4px 16px 4px 18.25px;
  margin: 20px 16px 0;
`;
const SearchInput = styled(Input)<{ isSavingNewRoute?: boolean }>`
  height: 36px;
  flex: 1;
  margin-left: ${({ isSavingNewRoute }) => (isSavingNewRoute ? '1.75px' : '18.25px')};
  margin-right: 31.2px;
`;
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
  border-bottom-color: ${COLOR.GRAY_EB};
`;
const StationInfoBox = styled.View`
  gap: 2.95px;
`;
const LocateIcon = styled.Image`
  width: 25px;
  height: 25px;
`;
