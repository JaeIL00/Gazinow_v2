import React, { useEffect, useRef, useState } from 'react';
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
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('ko');
dayjs.extend(relativeTime);

const NowScreen = () => {
  const queryClient = useQueryClient();
  const [activeButton, setActiveButton] = useState<NowScreenCapsules>('전체');
  const [isRefresh, setRefresh] = useState<boolean>(false);
  const [issuesList, setIssuesList] = useState<IssueContent[]>([]);
  const [layoutHeight, setLayoutHeight] = useState<number>(0);
  const [btnTitleHeight, setBtnTitleHeight] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);

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

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: 2,
      viewPosition: 0,
      viewOffset: -btnTitleHeight,
    });
  }, [activeButton]);

  return (
    <Container>
      {isPopularIssuesLoading || isAllIssuesLoading ? (
        <View style={{ alignItems: 'center' }}>
          <LoadingCircle width={50} height={50} />
        </View>
      ) : (
        <>
          <Header>
            <FontText value="NOW" textSize="24px" textWeight="SemiBold" lineHeight="34px" />
          </Header>
          <FlatList
            ListHeaderComponent={
              <>
                {popularIssues && popularIssues?.length > 0 && (
                  <>
                    <View
                      onLayout={(event) => {
                        const { height } = event.nativeEvent.layout;
                        setLayoutHeight(height);
                      }}
                    >
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
                          issue={item}
                          isLastItem={index === popularIssues.length - 1}
                          isHeader
                        />
                      ))}
                    </View>
                  </>
                )}
              </>
            }
            ref={flatListRef}
            stickyHeaderIndices={issuesList ? [2] : [0]}
            getItemLayout={(data, index) => ({ length: 0, offset: layoutHeight, index })}
            data={['버튼제목', '버튼', ...issuesList, '이슈없음']}
            renderItem={({ item, index }) => {
              if (popularIssues) {
                if (index === 0 && popularIssues?.length < 1) return null;
                else if (index === 0 && popularIssues?.length > 0)
                  return (
                    <View
                      onLayout={(event) => {
                        const { height } = event.nativeEvent.layout;
                        setBtnTitleHeight(height);
                      }}
                    >
                      <LaneButtons
                        activeButton={activeButton}
                        setActiveButton={setActiveButton}
                        titleNotShown={popularIssues?.length < 1}
                      />
                    </View>
                  );
                else if (index === 1) {
                  return (
                    <LaneButtons
                      activeButton={activeButton}
                      setActiveButton={setActiveButton}
                      titleNotShown={true}
                    />
                  );
                } else if (index === 2 && issuesList.length < 1) {
                  return (
                    <FontText
                      value="올라온 이슈가 없어요"
                      textSize="18px"
                      textWeight="Regular"
                      lineHeight="700px"
                      textColor={COLOR.GRAY_999}
                      textAlign="center"
                    />
                  );
                } else if (index === issuesList.length + 2) return null;
                else
                  return (
                    <IssueContainer
                      key={item.id}
                      isLastItem={index === issuesList.length + 1}
                      issue={item}
                    />
                  );
              }
              return null;
            }}
            ListFooterComponent={() => {
              if (issuesList.length > 3) {
                return <Space height="64px" width="999px" />;
              } else if (issuesList.length < 1) {
                return null;
              } else {
                return <Space height={`${700 - issuesList.length * 100}px`} />;
              }
            }}
            keyExtractor={(item, index) => `${item.id}_${index}`}
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
        </>
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
