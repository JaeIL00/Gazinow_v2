import { COLOR } from '@/global/constants';
import styled from '@emotion/native';
import SearchInputBox from './components/SearchInputBox';
import SearchResultList from './components/SearchResultList';
import { useGetSearchHistory } from '@/global/apis/hook';

const SubwaySearchScreen = () => {
  const { data: history } = useGetSearchHistory();

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
