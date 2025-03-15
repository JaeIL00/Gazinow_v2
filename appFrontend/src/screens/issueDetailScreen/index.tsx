import { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import IconLeftArrowHead from '@assets/icons/left_arrow_head.svg';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { FontText } from '@/global/ui';
import SingleCommentContainer from './components/SingleCommentContainer';
import IssueContent from './components/IssueContent';
import { useGetCommentsOnAIssue, useGetIssue } from './api/hooks';
import { useAppSelect } from '@/store';
import CommentInput from './components/CommentInput';
import MyTabModal from '@/global/components/MyTabModal';

const IssueDetailScreen = () => {
  const navigation = useRootNavigation();
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const issueId = useAppSelect((state) => state.subwaySearch.issueId);
  if (!issueId) return null;

  const { issueData, refetchIssue } = useGetIssue({ issueId });

  const {
    commentsOnAIssue,
    commentsOnAIssueHasNextPage,
    commentsOnAIssueRefetch,
    fetchCommentsOnAIssueNextPage,
  } = useGetCommentsOnAIssue({ issueId });

  const flattenedData = useMemo(() => {
    return commentsOnAIssue?.pages.flatMap((page) => page.content);
  }, [commentsOnAIssue]);

  if (!flattenedData || !issueData) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 bg-white">
        <MyTabModal
          isVisible={isOpenLoginModal}
          onCancel={() => setIsOpenLoginModal(false)}
          onConfirm={() => {
            setIsOpenLoginModal(false);
            navigation.navigate('AuthStack', { screen: 'Landing' });
          }}
          title="로그인 후 이용할 수 있어요"
          confirmText="로그인"
          cancelText="취소"
        />

        <TouchableOpacity className="p-16 w-30" hitSlop={20} onPress={() => navigation.goBack()}>
          <IconLeftArrowHead color="#3F3F46" height={24} />
        </TouchableOpacity>

        <FlatList
          data={flattenedData}
          renderItem={({ item, index }) => (
            <SingleCommentContainer
              item={item}
              setIsOpenLoginModal={setIsOpenLoginModal}
              key={`${index}_${item.issueCommentId}`}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          ListHeaderComponent={
            <IssueContent
              issueData={issueData}
              refetchIssue={refetchIssue}
              setIsOpenLoginModal={setIsOpenLoginModal}
            />
          }
          ListFooterComponent={flattenedData?.length > 0 ? <View className="h-64" /> : null}
          ListEmptyComponent={
            <View className="items-center justify-center flex-1">
              <FontText text="등록된 댓글이 없어요" className="text-[#DEDEDE]" />
            </View>
          }
          onEndReached={() => {
            if (commentsOnAIssueHasNextPage) {
              fetchCommentsOnAIssueNextPage();
            }
          }}
          refreshControl={
            <RefreshControl
              onRefresh={async () => {
                setIsRefreshing(true);
                await commentsOnAIssueRefetch();
                setIsRefreshing(false);
              }}
              refreshing={isRefreshing}
              progressViewOffset={-10}
            />
          }
        />
        <CommentInput
          issueData={issueData}
          issueId={issueId}
          setIsOpenLoginModal={setIsOpenLoginModal}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default IssueDetailScreen;
