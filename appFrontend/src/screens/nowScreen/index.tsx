import React, { useEffect, useState } from 'react';
import styled from '@emotion/native';
import { COLOR } from '@/global/constants';
import { useQueryClient } from 'react-query';
import { IssueContainer, LaneButtons } from './components';
import { FreshSubwayLineName, IssueContent, NowScreenCapsules } from '@/global/apis/entity';
import { FlatList, RefreshControl, View } from 'react-native';
import {
  useGetAllIssuesQuery,
  useGetPopularIssuesQuery,
  useGetIssuesByLaneQuery,
} from '@/global/apis/hooks';
import { FontText, Space } from '@/global/ui';
import { subwayReturnLineName } from '@/global/utils/subwayLine';
import LoadingCircle from '@/global/components/animations/LoadingCircle';

const NowScreen = () => {
  const queryClient = useQueryClient();
  const [activeButton, setActiveButton] = useState<NowScreenCapsules>('전체');
  const [isRefresh, setRefresh] = useState<boolean>(false);
  const [issuesList, setIssuesList] = useState<IssueContent[]>([]);

  const { popularIssues, popularIssuesRefetch, isPopularIssuesLoading } =
    useGetPopularIssuesQuery();

  const {
    allIssues,
    allIssuesRefetch,
    allIssuesHasNextPage,
    fetchAllIssuesNextPage,
    isAllIssuesLoading,
  } = useGetAllIssuesQuery();

  const { laneIssues, laneIssuesRefetch, laneIssuesHasNextPage, fetchLaneIssuesNextPage } =
    useGetIssuesByLaneQuery(subwayReturnLineName(activeButton as FreshSubwayLineName)!);

  useEffect(() => {
    queryClient.invalidateQueries(['getAllIssues', 'getIssuesByLane', 'getPopularIssues']);
    setIssuesList([]);
    if (isRefresh) {
      popularIssuesRefetch();
    }
    if (activeButton === '전체' && allIssues) {
      allIssuesRefetch();
      setIssuesList(allIssues?.pages.flatMap((page) => page.content));
    } else if (activeButton !== '전체' && laneIssues) {
      laneIssuesRefetch();
      setIssuesList(laneIssues?.pages.flatMap((page) => page.content));
    }
    setRefresh(false);
  }, [allIssues, laneIssues, activeButton, isRefresh]);

  const onEndReached = () => {
    if (activeButton === '전체' && allIssuesHasNextPage) {
      fetchAllIssuesNextPage();
    } else if (activeButton !== '전체' && laneIssuesHasNextPage) {
      fetchLaneIssuesNextPage();
    }
  };

  return (
    <Container>
      {isPopularIssuesLoading || isAllIssuesLoading ? (
        <View style={{ alignItems: 'center' }}>
          <LoadingCircle width={50} height={50} />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              <Header>
                <FontText value="NOW" textSize="24px" textWeight="SemiBold" lineHeight="34px" />
              </Header>
              {popularIssues && popularIssues?.length > 0 && (
                <>
                  <IssueLineType>
                    <FontText
                      value="지금 인기"
                      textSize="20px"
                      textWeight="SemiBold"
                      lineHeight="25px"
                    />
                  </IssueLineType>
                  {popularIssues?.map((item, index) => (
                    <IssueContainer
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      time={item.agoTime}
                      body={item.content}
                      isLastItem={index === popularIssues.length - 1}
                      isHeader={true}
                    />
                  ))}
                </>
              )}
              {popularIssues && (
                <LaneButtons
                  activeButton={activeButton}
                  setActiveButton={setActiveButton}
                  titleShown={popularIssues.length > 0}
                />
              )}
            </>
          }
          data={issuesList}
          renderItem={({ item, index }) => (
            <IssueContainer
              key={item.id}
              id={item.id}
              title={item.title}
              time={item.agoTime}
              body={item.content}
              isLastItem={index === issuesList.length - 1}
              isHeader={false}
            />
          )}
          keyExtractor={(item, index) => `${item.id}_${index}`}
          ListFooterComponent={<Space height="64px" width="999px" />}
          ListEmptyComponent={
            <FontText
              value="올라온 이슈가 없어요"
              textSize="18px"
              textWeight="Regular"
              lineHeight="400px"
              textColor={COLOR.GRAY_999}
              textAlign="center"
            />
          }
          refreshControl={
            <RefreshControl
              onRefresh={() => setRefresh(true)}
              refreshing={isRefresh}
              progressViewOffset={-10}
            />
          }
          onEndReached={onEndReached}
          onEndReachedThreshold={0.4}
        />
      )}
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${COLOR.WHITE};
  flex: 1;
  justify-content: center;
`;
const Header = styled.View`
  padding: 32px 16px 11px;
`;
const IssueLineType = styled.View`
  padding: 24px 16px 12px;
`;

export default NowScreen;
