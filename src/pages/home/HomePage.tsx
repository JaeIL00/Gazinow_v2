import styled from '@emotion/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { Text } from 'react-native';

import { SwapSubwayStation, SavedRouteIssues } from '@/components/home/organism';
import { SUBWAY_INFO_STORAGE_KEY } from '@/constants';
import { useSubwayInfoQuery } from '@/hooks/queries';
import { useAppDispatch } from '@/store';
import { getSubwayPublicData } from '@/store/modules';

const getSubwayInfoStorage = async () => {
  try {
    const infoData = await AsyncStorage.getItem(SUBWAY_INFO_STORAGE_KEY);
    return infoData ? JSON.parse(infoData) : infoData;
  } catch (error) {
    // debug
    console.error('Failed subway info get storage ', error);
  }
};

const HomePage = () => {
  const dispatch = useAppDispatch();

  const { subwayInfoFetching } = useSubwayInfoQuery();

  const checkSavedSubwayInfo = async () => {
    const data = await getSubwayInfoStorage();
    if (data) dispatch(getSubwayPublicData(data));
    else subwayInfoFetching();
  };

  useEffect(() => {
    checkSavedSubwayInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Text>홈 페이지</Text>
      <SwapSubwayStation isWrap={true} />
      <SavedRouteIssues/>
    </Container>
  );
};

export default HomePage;

const Container = styled.View`
  padding: 0 16px;
`;
