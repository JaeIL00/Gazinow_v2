import { SearchInputBox, SearchResultList } from '@/components/search/organism';
import { useSerarchHistory } from '@/hooks';

const SubwaySearchPage = () => {
  const { data: history } = useSerarchHistory();

  return (
    <>
      <SearchInputBox />
      {history && <SearchResultList historyList={history} />}
    </>
  );
};

export default SubwaySearchPage;
