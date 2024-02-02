import styled from '@emotion/native';
import { Text } from 'react-native';
import { SavedRouteIssues } from './components';
import { SwapSubwayStation } from '@/global/components';
import { useAppDispatch, useAppSelect } from '@/store';
import { useLayoutEffect } from 'react';
import { initialize } from '@/store/modules';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = () => {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const isSearchedPath = useAppSelect(({ subwaySearch }) => subwaySearch.isSearchedPath);

  useLayoutEffect(() => {
    if (isSearchedPath) {
      dispatch(initialize());
    }
  }, [isFocused]);

  return (
    <Container>
      <Text>홈 페이지</Text>
      <SwapSubwayStation isWrap={true} showHeader={false} />
      <SavedRouteIssues />
    </Container>
  );
};

export default HomeScreen;

const Container = styled.ScrollView`
  padding: 0 16px;
  // background-color: white;
  flex: 1;
`;
