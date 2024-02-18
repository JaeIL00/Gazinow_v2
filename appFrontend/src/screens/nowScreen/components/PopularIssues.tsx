import { useGetPopularIssuesQuery } from '@/global/apis/hook';
import { FontText, Space } from '@/global/ui';
import { FlatList } from 'react-native';
import { COLOR } from '@/global/constants';
import styled from '@emotion/native';
import { AllIssuesFL, FilterByLane, IssueContainer, LaneButtons } from '.';
import { NowScreenCapsules } from '@/global/apis/entity';

interface PopularIssuesProps {
  activeButton: NowScreenCapsules;
  setActiveButton: (activeButton: NowScreenCapsules) => void;
}

const PopularIssues = ({ activeButton, setActiveButton }: PopularIssuesProps) => {
  const { data: PopularIssues } = useGetPopularIssuesQuery();

  return (
    <FlatList
      data={PopularIssues?.content}
      ListHeaderComponent={
        <>
          <Header>
            <FontText value="NOW" textSize="24px" textWeight="SemiBold" lineHeight="34px" />
          </Header>
          <IssueLineType>
            <FontText value="지금 인기" textSize="20px" textWeight="SemiBold" lineHeight="25px" />
          </IssueLineType>
        </>
      }
      renderItem={({ item }) => {
        return (
          <IssueContainer
            key={item.id}
            id={item.id}
            title={item.title}
            // TODO: mvp 이후 장소 넣기
            // location="중구 만리동"
            time={item.agoTime}
            body={item.content}
          />
        );
      }}
      keyExtractor={(item, index) => `${item.id}_${index}`}
      ListFooterComponent={
        <>
          <Space height="12px" width="999px" backgroundColor={COLOR.WHITE} />
          <Space height="8px" width="999px" backgroundColor={COLOR.GRAY_F8} />
          <Space height="12px" width="999px" backgroundColor={COLOR.WHITE} />

          <LaneButtons activeButton={activeButton} setActiveButton={setActiveButton} />

          {activeButton === '전체' && <AllIssuesFL />}
          {activeButton !== '전체' && <FilterByLane lane={activeButton} />}
        </>
      }
      ListEmptyComponent={
        <FontText
          value="인기 이슈가 없어요" //TODO: 문구 수정
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
export default PopularIssues;
const Header = styled.View`
  padding: 32px 16px 11px;
`;
const IssueLineType = styled.View`
  padding: 24px 16px 12px;
`;
