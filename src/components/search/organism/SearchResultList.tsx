import { useAppSelect } from '@/store';

const SearchResultList = () => {
  const resultData = useAppSelect(({ subwaySearch }) => subwaySearch.searchResult);
  console.log(resultData);
  return <></>;
};

export default SearchResultList;
