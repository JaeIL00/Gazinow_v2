import React, { useEffect, useState } from 'react';
import styled from '@emotion/native';
import { COLOR } from '@/global/constants';
import { useQueryClient } from 'react-query';
import { IssueContainer, LaneButtons } from './components';
import { FreshSubwayLineName, IssueContent, NowScreenCapsules } from '@/global/apis/entity';
import { Alert, FlatList, RefreshControl, View } from 'react-native';
import {
  useGetAllIssuesQuery,
  useGetPopularIssuesQuery,
  useGetIssuesByLaneQuery,
} from '@/global/apis/hooks';
import { FontText, Space } from '@/global/ui';
import { subwayReturnLineName } from '@/global/utils/subwayLine';
import LoadingAnimations from '@/global/components/animations/LoadingAnimations';
import { AxiosError } from 'axios';

const NowScreen = () => {
  const queryClient = useQueryClient();
  const [activeButton, setActiveButton] = useState<NowScreenCapsules>('전체');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isActiveBtnChanged, setIsActiveBtnChanged] = useState<boolean>(true);
  const [isRefresh, setRefresh] = useState<boolean>(false);
  const [issuesPage, setIssuesPage] = useState(0);
  const [issuesList, setIssuesList] = useState<IssueContent[]>([]);

  useEffect(() => {
    // queryClient.invalidateQueries('getPopularIssues');
    queryClient.invalidateQueries(['getAllIssues', 'getIssuesByLane']);
    setIsActiveBtnChanged(true);
    setIssuesList([]);
    setIssuesPage(0);
  }, [activeButton]);

  const getIssuesCallback = {
    onSuccess: () => {
      setTimeout(() => {
        setRefresh(false);
        setIsLoading(false);
        setIsActiveBtnChanged(false);
      }, 200);
    },
    onError: (error: AxiosError) => {
      if (error.message.includes('Network Error')) {
        Alert.alert('', '네트워크 연결을 확인해 주세요.');
      }
      setRefresh(false);
      setIsLoading(false);
      setIsActiveBtnChanged(false);
    },
  };

  const { popularIssues, popularIssuesRefetch } = useGetPopularIssuesQuery(getIssuesCallback);
  const { allIssues, allIssuesRefetch } = useGetAllIssuesQuery(issuesPage, getIssuesCallback);
  const { laneIssues, laneIssuesRefetch } = useGetIssuesByLaneQuery(
    issuesPage,
    subwayReturnLineName(activeButton as FreshSubwayLineName)!,
    getIssuesCallback,
  );

  useEffect(() => {
    if (allIssues) {
      setIssuesList((prevList) => [...prevList, ...allIssues.content]);
    }
    if (laneIssues) {
      setIssuesList(laneIssues.content);
    }
  }, [allIssues, laneIssues, activeButton]);

  const refreshIssues = () => {
    setRefresh(true);
    setIsLoading(true);
    popularIssuesRefetch();
    allIssuesRefetch();
    laneIssuesRefetch();
  };

  return (
    <Container>
      {isLoading ? (
        <LoadingAnimations />
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              <Header>
                <FontText value="NOW" textSize="24px" textWeight="SemiBold" lineHeight="34px" />
              </Header>
              {popularIssues!.length > 0 && (
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
              <LaneButtons
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                titleShown={popularIssues!.length > 0}
              />
            </>
          }
          data={issuesList}
          renderItem={({ item, index }) =>
            isActiveBtnChanged ? (
              index === 0 ? (
                <View style={{ marginTop: 30 }}>
                  <LoadingAnimations />
                </View>
              ) : null
            ) : (
              <IssueContainer
                key={item.id}
                id={item.id}
                title={item.title}
                time={item.agoTime}
                body={item.content}
                isLastItem={index === issuesList.length - 1}
                isHeader={false}
              />
            )
          }
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
              onRefresh={refreshIssues}
              refreshing={isRefresh}
              progressViewOffset={-10}
            />
          }
          onEndReached={() => {
            if (issuesList.length >= 15) {
              setIssuesPage((prevPage) => prevPage + 1);
            }
          }}
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
