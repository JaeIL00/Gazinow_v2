import { useGetAllIssuesQuery } from '@/global/apis/hook';
import { FontText, Space } from '@/global/ui';
import { FlatList } from 'react-native';
import { COLOR } from '@/global/constants';
import { IssueContainer } from '.';

const AllIssuesFL = () => {
  const { data: allIssues } = useGetAllIssuesQuery();

  return (
    <FlatList
      data={allIssues?.content}
      renderItem={({ item, index }) => {
        const isLastItem = allIssues?.content && index === allIssues.content.length - 1;
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
export default AllIssuesFL;
