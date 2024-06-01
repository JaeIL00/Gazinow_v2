import { useMutation, useQuery } from 'react-query';
import { deletePostLike, getIssueDetail, postLike } from './func';
import { useAppSelect } from '@/store';

/**
 * 상세 이슈 조회 훅
 */
export const useGetIssue = ({ issueId }: { issueId: number | null }) => {
  const isVerifiedUser = useAppSelect((state) => state.auth.isVerifiedUser);
  const { data, isLoading, refetch } = useQuery(
    ['issue', issueId],
    () => getIssueDetail({ params: { id: issueId }, isVerifiedUser }),
    {
      enabled: !!issueId,
    },
  );
  return { issueData: data, isLoadingIssue: isLoading, refetchIssue: refetch };
};

/**
 * 상세 이슈 도움돼요 추가 훅
 */
export const usePostLike = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutate } = useMutation({
    mutationFn: postLike,
    onSuccess,
  });
  return { doLikeMutate: mutate };
};

/**
 * 상세 이슈 도움돼요 삭제 훅
 */
export const useDeletePostLike = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutate } = useMutation({
    mutationFn: deletePostLike,
    onSuccess,
  });
  return { deleteLikeMutate: mutate };
};
