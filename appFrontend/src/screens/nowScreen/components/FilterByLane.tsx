import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { FontText, Space } from '@/global/ui';
import { IssueContainer } from '.';
import { AllIssues } from '@/global/apis/entity';
import { axiosInstance } from '@/global/apis/axiosInstance';
import { COLOR } from '@/global/constants';

interface FilterByLaneProps {
  lane: string;
}

const FilterByLane = ({ lane }: FilterByLaneProps) => {
  // const { data: issues } = useGetIssuesByLaneQuery(lane);

  const [issues, setIssues] = useState<AllIssues | null>();

  useEffect(() => {
    axiosInstance
      .get<{ data: AllIssues }>('/api/v1/issue/get_line', {
        params: { line: lane },
      })
      .then((res) => {
        setIssues(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIssues(null);
        Alert.alert('네트워크 오류', '인터넷 연결을 확인해주세요');
      });
  }, [lane]);

  return (
    <FlatList
      data={issues?.content}
      renderItem={({ item, index }) => {
        const isLastItem = issues?.content && index === issues.content.length - 1;
        return (
          <IssueContainer
            key={item.id}
            id={item.id}
            title={item.title}
            // TODO: mvp 이후 장소 넣기
            // location="중구 만리동"
            time={item.agoTime}
            body={item.content}
            isLastItem={isLastItem}
          />
        );
      }}
      keyExtractor={(item, index) => `${item.id}_${index}`}
      ListFooterComponent={<Space height="64px" width="999px" backgroundColor={COLOR.WHITE} />}
      ListEmptyComponent={
        <FontText
          value="올라온 이슈가 없어요" //TODO: 문구 수정
          textSize="18px"
          textWeight="Regular"
          lineHeight="500px" //TODO: 크기 수정
          textColor={COLOR.GRAY_999}
          textAlign="center"
        />
      }
    />
  );
};
export default FilterByLane;
