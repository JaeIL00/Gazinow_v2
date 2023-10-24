import styled from '@emotion/native';

import { SearchInputBox, SearchResultList } from '@/components/search/organism';

const SubwaySearchPage = () => {
  return (
    <Container>
      <SearchInputBox />
      <SearchResultList />
    </Container>
  );
};

export default SubwaySearchPage;

const Container = styled.View`
  padding: 0 16px;
`;
