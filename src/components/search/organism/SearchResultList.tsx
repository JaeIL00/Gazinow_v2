import { useAppSelect } from '@/store';

const SearchResultList = () => {
  const resultData = useAppSelect(({ subwaySearch }) => subwaySearch.searchResult);
  return <></>;
};

export default SearchResultList;
