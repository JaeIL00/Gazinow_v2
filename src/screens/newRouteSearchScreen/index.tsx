import { COLOR } from '@/global/constants';
import styled from '@emotion/native';
import { useGetSearchHistory } from '@/global/apis/hook';
import { useRoute } from '@react-navigation/native';
import SearchInputBox from '../subwaySearchScreen/components/SearchInputBox';
import SearchResultList from '../subwaySearchScreen/components/SearchResultList';

const NewRouteSearchScreen = () => {
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
export default NewRouteSearchScreen;
