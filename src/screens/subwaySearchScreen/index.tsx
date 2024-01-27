import { COLOR } from '@/global/constants';
import styled from '@emotion/native';
import SearchInputBox from './components/SearchInputBox';
import SearchResultList from './components/SearchResultList';
import { useGetSearchHistory } from '@/global/apis/hook';
import { useRoute } from '@react-navigation/native';

const SubwaySearchScreen = () => {
  const { params } = useRoute();
  const { isBackBtn } = params as { isBackBtn: boolean };

  const { data: history } = useGetSearchHistory();

  return (
    <SearchScreenContainer>
      <SearchInputBox isBackBtn={isBackBtn} />
      {history && <SearchResultList historyList={history} />}
    </SearchScreenContainer>
  );
};
const SearchScreenContainer = styled.View`
  background-color: ${COLOR.WHITE};
  flex: 1;
`;
export default SubwaySearchScreen;
