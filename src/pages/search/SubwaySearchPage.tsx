import { SearchInputBox, SearchResultList } from '@/components/search/organism';
import { COLOR } from '@/constants';
import { useSerarchHistory } from '@/hooks';
import styled from '@emotion/native';

const SubwaySearchPage = () => {
  const { data: history } = useSerarchHistory();
  console.log(history);

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
export default SubwaySearchPage;
