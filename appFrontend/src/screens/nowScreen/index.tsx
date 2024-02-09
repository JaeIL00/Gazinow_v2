import React, { useState } from 'react';
import styled from '@emotion/native';
import { FontText } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  useGetAllIssuesQuery,
  useGetIssuesByLaneQuery,
  useGetSavedRoutesQuery,
} from '@/global/apis/hook';
import { CombinedData, Path } from '@/global/apis/entity';
import IssueContainer from './components/IssueContainer';

//FIXME: 모든 노선의 이슈에 1호선의 이슈 목록만 가져와짐, 저장된 경로 중 1호선이 없으면 노선별 이슈 렌더링이 안 됨....
//TODO: N호선 버튼 누르면 해당 노선 이슈로 자동 스크롤 기능
//TODO: + 버튼 기획?
//TODO: 지금 인기와 저장한 경로(의 이슈)가 모두 없을 때의 기획?
const NowScreen = () => {
  const [activeButton, setActiveButton] = useState<string>('전체');
  const renderButtons = () => {
    return [' + ', '전체', ...savedStations].map((text) => (
      <ButtonStyle
        key={text}
        onPress={() => setActiveButton(text)}
        activeButton={activeButton === text}
      >
        <FontText
          value={text}
          textSize="16px"
          textWeight="Medium"
          lineHeight="21px"
          textColor={activeButton === text ? 'white' : '#969696'}
        />
      </ButtonStyle>
    ));
  };

  // 'N분 전' 계산
  const getTimeDifference = (startDate: string) => {
    const timeDifference = new Date().getTime() - new Date(startDate).getTime();
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    return { hoursDifference, minutesDifference };
  };

  const { data: savedRoutes } = useGetSavedRoutesQuery();

  // 내가 저장한 경로의 노선만 가져옴
  //FIXME: 타입에러
  const savedStations: string[] = Array.from(
    new Set(
      savedRoutes.flatMap((item: Path) =>
        item.subPaths.flatMap((subPath) => subPath.lanes.map((lane) => `${lane.stationCode}호선`)),
      ),
    ),
  ).sort();

  // '지금 인기' 전체 이슈 목록 GET
  const { data: AllIssues } = useGetAllIssuesQuery();

  // '지금 인기' & 'N호선 NOW' 이슈 목록을 한 곳에 저장
  const combinedData: CombinedData[] = [];

  if (AllIssues?.content && AllIssues.content.length > 0) {
    combinedData.push({ type: 'allIssues' });
    combinedData.push(...AllIssues.content);
  }
  savedStations.forEach((station) => {
    const { data } = useGetIssuesByLaneQuery(station);
    if (data?.content && data.content.length > 0) {
      combinedData.push({ type: station });
      combinedData.push(...data.content);
    }
  });

  return (
    <Container>
      <Header>
        <FontText value="NOW" textSize="24px" textWeight="SemiBold" lineHeight="34px" />
      </Header>
      <Category>
        <View style={styles.textContainer}>{renderButtons()}</View>
      </Category>
      <FlatList
        data={combinedData}
        renderItem={({ item, index }) => {
          const isLastItemOfType =
            index === combinedData.length - 1 || combinedData[index + 1].type !== item.type;
          const isLastItem = index === combinedData.length - 1;
          if (item.type === 'allIssues') {
            return (
              <IssueLineType>
                <FontText
                  value="지금 인기"
                  textSize="20px"
                  textWeight="SemiBold"
                  lineHeight="25px"
                />
              </IssueLineType>
            );
          } else if (savedStations.includes(item.type)) {
            return (
              <IssueLineType>
                <FontText
                  value={`${item.type} NOW`}
                  textSize="20px"
                  textWeight="SemiBold"
                  lineHeight="25px"
                />
              </IssueLineType>
            );
          } else if (item.id && item.title && item.content && item.startDate) {
            const { hoursDifference, minutesDifference } = getTimeDifference(item.startDate);
            return (
              <IssueContainer
                key={item.id}
                id={item.id}
                title={item.title}
                location="중구 만리동" //FIXME: 백엔드
                time={`${hoursDifference}시간 ${minutesDifference}분전`}
                body={item.content}
                isLastItemOfType={isLastItemOfType}
                isLastItem={isLastItem}
              />
            );
          }
          return null;
        }}
        keyExtractor={(item, index) => `${item.id}_${index}`}
      />
    </Container>
  );
};

const Container = styled.View`
  padding-top: 21px;
  background-color: ${COLOR.WHITE};
  flex: 1;
`;
const Header = styled.View`
  padding: 11px 16px;
`;
const ButtonStyle = styled.TouchableOpacity<{ activeButton: boolean }>`
  border-width: 1px;
  border-color: ${({ activeButton }) => (activeButton ? 'transparent' : COLOR.GRAY_EB)};
  border-radius: 999px;
  padding-vertical: 8px;
  padding-horizontal: 16px;
  margin-right: 6px;
  background-color: ${({ activeButton }) => (activeButton ? '#171717' : 'white')};
`;
const Category = styled.View`
  padding: 12px 16px;
  flex-direction: row;
  align-items: center;
`;
const IssueLineType = styled.View`
  padding: 24px 16px 12px;
`;

const styles = StyleSheet.create({
  navButton: {
    borderWidth: 1,
    borderColor: COLOR.GRAY_EB,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 6,
  },
  textContainer: {
    flexDirection: 'row',
  },
});

export default NowScreen;
