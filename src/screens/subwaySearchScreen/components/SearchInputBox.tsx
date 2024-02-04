import styled from '@emotion/native';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

import { Input, IconButton } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { useAppDispatch, useAppSelect } from '@/store';
import { getSearchText } from '@/store/modules/subwaySearchModule';

const SearchInputBox = ({ isBackBtn }: { isBackBtn: boolean }) => {
  const rootNavigation = useRootNavigation();
  const dispatch = useAppDispatch();
  const { stationType } = useAppSelect(({ subwaySearch }) => subwaySearch);

  const [searchText, setSearchText] = useState<string>('');

  const backToScreen = () => {
    rootNavigation.goBack();
  };

  const changeSearchText = (text: string) => {
    setSearchText(text);
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
    setSearchText('');
  };

  return (
    <Container>
      {isBackBtn && (
        <IconButton
          iconType="Ionicons"
          isFontIcon
          iconName="arrow-back-sharp"
          iconWidth="19.5"
          iconColor="#49454F"
          onPress={backToScreen}
        />
      )}
      <SearchInput
        isBackBtn={isBackBtn}
        value={searchText}
        placeholder={`${stationType}을 검색해보세요`}
        placeholderTextColor={COLOR.GRAY_BE}
        inputMode="search"
        onChangeText={changeSearchText}
        autoFocus
      />
      <IconButton
        iconType="Ionicons"
        isFontIcon
        iconName="close-circle"
        iconWidth="19.5"
        iconColor="rgba(0, 0, 0, 0.46)"
        onPress={deleteInputText}
      />
    </Container>
  );
};

export default SearchInputBox;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 28px;
  border: 1px solid #d4d4d4;
  padding: 4px 16px 4px 18.25px;
  margin: 16px 16px 0;
`;

const SearchInput = styled(Input)<{ isBackBtn: boolean }>`
  height: 36px;
  flex: 1;
  margin-left: ${({ isBackBtn }) => (isBackBtn ? '18.25px' : '3px')};
  margin-left: 18.25px;
  margin-right: 31.2px;
`;
