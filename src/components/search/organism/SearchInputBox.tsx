import styled from '@emotion/native';

import { Input } from '@/components/common/atoms';
import { IconButton } from '@/components/common/molecules';

const SearchInputBox = () => {
  return (
    <Container>
      <IconButton isFontIcon iconName="arrow-back-sharp" iconWidth="19.5" iconColor="#49454F" />
      <SearchInput placeholder="출발역을 검색해보세요" placeholderTextColor="#BEBEBE" />
      <IconButton
        isFontIcon
        iconName="close-circle"
        iconWidth="19.5"
        iconColor="rgba(0, 0, 0, 0.46)"
      />
    </Container>
  );
};

export default SearchInputBox;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 28px;
  border: 1px solid #d4d4d4;
  padding: 4px 16px 4px 18.25px;
  margin-top: 16px;
`;

const SearchInput = styled(Input)`
  height: 36px;
  flex: 1;
  margin-left: 18.25px;
  margin-right: 31.2px;
`;
