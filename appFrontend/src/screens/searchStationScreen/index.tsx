import { useAddRecentSearch, useGetSearchHistory, useSearchStationName } from '@/global/apis/hook';
import { COLOR } from '@/global/constants';
import { FontText, Space } from '@/global/ui';
import { subwayReturnLineName } from '@/global/utils/subwayLine';
import { useAppDispatch, useAppSelect } from '@/store';
import { getSearchText, getSeletedStation } from '@/store/modules/stationSearchModule';
import styled from '@emotion/native';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { SelectedStationTypes } from '../searchPathResultScreen';
import { Input } from '@/global/ui';
import IconLocationPin from '@assets/icons/location_pin.svg';
import { useHomeNavigation } from '@/navigation/HomeNavigation';
import IconClock from '@assets/icons/clock.svg';
import IconLeftArrow from '@assets/icons/left_arrow_sharp.svg';
import IconXCircleFill from '@assets/icons/x_circle_fill.svg';

interface SearchStationModalProps {
  searchType: '출발역' | '도착역';
  closeModal: () => void;
  setSubwayStation: React.Dispatch<React.SetStateAction<SelectedStationTypes>>;
}

const SearchStationScreen = () => {
  const navigation = useHomeNavigation();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const deleteInputText = () => {
    setSearchTextValue('');
  };

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
      const isDuplicate =
        selectedStation.arrival.stationName === stationName ||
        selectedStation.departure.stationName === stationName;
      if (isDuplicate) {
        navigation.goBack();
      } else if (
        (key === 'departure' && selectedStation.arrival.stationName) ||
        (key === 'arrival' && selectedStation.departure.stationName)
      ) {
        navigation.navigate('SubwayPathResult');
      } else navigation.goBack();
    },
  });

  const stationBtnHandler = ({ stationName, stationLine }: (typeof searchResultData)[0]) => {
    if (!stationLine) return;
    addRecentMutate({ stationName, stationLine: subwayReturnLineName(stationLine) });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLOR.WHITE,
      }}
    >
      <Container>
        <TouchableOpacity activeOpacity={1} hitSlop={10} onPress={() => navigation.goBack()}>
          <IconLeftArrow />
        </TouchableOpacity>
        <Space width="16px" />
        <SearchInput
          value={searchTextValue}
          placeholder={`${stationType}을 검색해보세요`}
          placeholderTextColor={COLOR.GRAY_BE}
          inputMode="search"
          onChangeText={changeSearchText}
          autoFocus
          isSavingNewRoute
        />
        <TouchableOpacity activeOpacity={1} onPress={deleteInputText}>
          <IconXCircleFill />
        </TouchableOpacity>
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
                <IconClock />
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

export default SearchStationScreen;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 28px;
  border: 1px solid #d4d4d4;
  padding: 4px 16px 4px 18.25px;
  margin: 16px 16px 0;
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
