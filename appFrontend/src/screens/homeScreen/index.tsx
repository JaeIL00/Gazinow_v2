import styled from '@emotion/native';
import { Platform, ScrollView, StatusBar, Text, View } from 'react-native';
import { SavedRouteIssues, SwapStation } from './components';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const HomeScreen = () => {
  const StatusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : (StatusBar.currentHeight as number);

  return (
    <ScrollView
      style={{
        paddingVertical: Platform.OS === 'ios' ? StatusBarHeight : 0,
        flex: 1,
        paddingHorizontal: 16,
      }}
    >
      <Text>홈 페이지</Text>
      <SwapStation />
      {/* <SwapSubwayStation isWrap={true} showHeader={false} /> */}
      <SavedRouteIssues />
    </ScrollView>
  );
};

export default HomeScreen;

const Container = styled.SafeAreaView`
  padding: 0 16px;
  flex: 1;
`;
