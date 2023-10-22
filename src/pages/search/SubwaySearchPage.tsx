import styled from '@emotion/native';

import { SearchInputBox } from '@/components/search/organism';

const SubwaySearchPage = () => {
  return (
    <Container>
      <SearchInputBox />
    </Container>
  );
};

export default SubwaySearchPage;

const Container = styled.View`
  padding: 0 16px;
`;
