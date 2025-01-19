import React, { useMemo, useState } from 'react';
import { SingleIssueContainer, LaneButtons, PopularIssues } from './components';
import { FreshSubwayLineName, NowScreenCapsules } from '@/global/apis/entity';
import { FlatList, RefreshControl, SafeAreaView, View } from 'react-native';
import {
  useGetAllIssuesQuery,
  useGetIssuesByLaneQuery,
  useGetPopularIssuesQuery,
} from '@/global/apis/hooks';
import { FontText } from '@/global/ui';
import { subwayReturnLineName } from '@/global/utils/subwayLine';
import LoadingCircle from '@/global/components/animations/LoadingCircle';

const NowScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<NowScreenCapsules>('전체');

  const { popularIssues, popularIssuesRefetch } = useGetPopularIssuesQuery();

  const {
    allIssues,
    allIssuesRefetch,
    allIssuesHasNextPage,
    fetchAllIssuesNextPage,
    isAllIssuesLoading,
  } = useGetAllIssuesQuery();

  const { laneIssues, laneIssuesRefetch, laneIssuesHasNextPage, fetchLaneIssuesNextPage } =
    useGetIssuesByLaneQuery(subwayReturnLineName(activeButton as FreshSubwayLineName)!);

  // 선택된 캡슐에 따른 데이터 렌더링
  const flattenedData = useMemo(() => {
    if (activeButton === '전체') {
      return allIssues?.pages.flatMap((page) => page.content) ?? [];
    }
    return laneIssues?.pages.flatMap((page) => page.content) ?? [];
  }, [activeButton, allIssues, laneIssues]);

  const onRefreshHandler = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        popularIssuesRefetch(),
        activeButton === '전체' ? allIssuesRefetch() : laneIssuesRefetch(),
      ]);
    } catch (error) {
      // TODO: 에러 처리
    } finally {
      setIsRefreshing(false);
    }
    setIsRefreshing(false);
  };

  const onEndReachedHandler = () => {
    if (activeButton === '전체' && allIssuesHasNextPage) {
      fetchAllIssuesNextPage();
    } else if (activeButton !== '전체' && laneIssuesHasNextPage) {
      fetchLaneIssuesNextPage();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {isAllIssuesLoading ? (
        <View className="items-center justify-center flex-1">
          <LoadingCircle width={50} height={50} />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              {/* TODO: 인기 이슈 없을 때 기획 나오면 수정 */}
              {popularIssues && <PopularIssues popularIssues={popularIssues} />}
              <LaneButtons activeButton={activeButton} setActiveButton={setActiveButton} />
            </>
          }
          data={flattenedData}
          renderItem={({ item, index }) => (
            <SingleIssueContainer key={`${item.id}_${index}`} issue={item} />
          )}
          ListEmptyComponent={
            <View className="items-center justify-center flex-1">
              <FontText text="올라온 이슈가 없어요" className="text-center text-18 text-gray-999" />
            </View>
          }
          ListFooterComponent={() => {
            if (flattenedData.length > 0) return <View className="h-64" />;
          }}
          refreshControl={<RefreshControl onRefresh={onRefreshHandler} refreshing={isRefreshing} />}
          contentContainerStyle={{ flexGrow: 1 }}
          onEndReached={onEndReachedHandler}
          onEndReachedThreshold={0.7}
          keyExtractor={(item, index) => `${item.id}_${index}`}
        />
      )}
    </SafeAreaView>
  );
};

export default NowScreen;
