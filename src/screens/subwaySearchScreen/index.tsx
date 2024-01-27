import { COLOR } from '@/global/constants';
import { useSerarchHistory } from '@/hooks';
import styled from '@emotion/native';
import SearchInputBox from './components/SearchInputBox';
import SearchResultList from './components/SearchResultList';

const SubwaySearchScreen = () => {
  const { data: history } = useSerarchHistory();

  return (
    <SearchPageContainer>
      <SearchInputBox />
      {history && <SearchResultList historyList={history} />}
    </SearchPageContainer>
  );
};
const SearchPageContainer = styled.View`
  background-color: ${COLOR.WHITE};
  flex: 1;
`;
export default SubwaySearchScreen;
