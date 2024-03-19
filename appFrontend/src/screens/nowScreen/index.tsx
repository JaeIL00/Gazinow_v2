import React, { useEffect, useState } from 'react';
import styled from '@emotion/native';
import { COLOR } from '@/global/constants';
import { useQueryClient } from 'react-query';
import { IssueContainer, LaneButtons } from './components';
import { FreshSubwayLineName, NowScreenCapsules } from '@/global/apis/entity';
import { FlatList, RefreshControl } from 'react-native';
import {
  useGetAllIssuesQuery,
  useGetPopularIssuesQuery,
  useGetIssuesByLaneQuery,
} from '@/global/apis/hooks';
import { FontText, Space } from '@/global/ui';
import { subwayReturnLineName } from '@/global/utils/subwayLine';

const NowScreen = () => {
  const queryClient = useQueryClient();
  const [activeButton, setActiveButton] = useState<NowScreenCapsules>('전체');

  useEffect(() => {
    queryClient.invalidateQueries('getAllIssues');
    queryClient.invalidateQueries('getPopularIssues');
  }, [activeButton]);

  const [isRefresh, setRefresh] = useState<boolean>(false);
  const { popularIssues, popularIssuesRefetch } = useGetPopularIssuesQuery({
    onSuccess: () => setRefresh(false),
  });

  const refreshPopularIssues = () => {
    setRefresh(true);
    popularIssuesRefetch();
  };

  const { data: allIssues } = useGetAllIssuesQuery();

  const laneIssues =
    activeButton !== null
      ? useGetIssuesByLaneQuery(subwayReturnLineName(activeButton as FreshSubwayLineName)!).data
      : null;

  const issuesList = activeButton === '전체' ? allIssues?.content : laneIssues?.content;

  return (
    <Container>
      <FlatList
        ListHeaderComponent={
          <>
            <Header>
              <FontText value="NOW" textSize="24px" textWeight="SemiBold" lineHeight="34px" />
            </Header>
            <IssueLineType>
              <FontText value="지금 인기" textSize="20px" textWeight="SemiBold" lineHeight="25px" />
            </IssueLineType>
            {popularIssues?.map((item, index) => (
              <IssueContainer
                key={item.id}
                id={item.id}
                title={item.title}
                // TODO: mvp 이후 장소 넣기
                // location="중구 만리동"
                time={item.agoTime}
                body={item.content}
                isLastItem={index === popularIssues.length - 1}
              />
            ))}
            <Space height="12px" width="999px" backgroundColor={COLOR.WHITE} />
            <Space height="8px" width="999px" backgroundColor={COLOR.GRAY_F8} />
            <Space height="12px" width="999px" backgroundColor={COLOR.WHITE} />
            <LaneButtons activeButton={activeButton} setActiveButton={setActiveButton} />
          </>
        }
        data={issuesList}
        renderItem={({ item, index }) => {
          if (!issuesList) {
            return null;
          }
          return (
            <IssueContainer
              key={item.id}
              id={item.id}
              title={item.title}
              // TODO: mvp 이후 장소 넣기
              // location="중구 만리동"
              time={item.agoTime}
              body={item.content}
              isLastItem={index === issuesList.length - 1}
            />
          );
        }}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        ListFooterComponent={<Space height="64px" width="999px" />}
        ListEmptyComponent={
          <FontText
            value="올라온 이슈가 없어요"
            textSize="18px"
            textWeight="Regular"
            lineHeight="500px"
            textColor={COLOR.GRAY_999}
            textAlign="center"
          />
        }
        refreshControl={
          <RefreshControl
            onRefresh={refreshPopularIssues}
            refreshing={isRefresh}
            progressViewOffset={-10}
          />
        }
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${COLOR.WHITE};
  flex: 1;
`;
const Header = styled.View`
  padding: 32px 16px 11px;
`;
const IssueLineType = styled.View`
  padding: 24px 16px 12px;
`;

export default NowScreen;
