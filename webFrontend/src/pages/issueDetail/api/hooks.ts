import { useMutation, useQuery } from "@tanstack/react-query";
import { deletePostLike, getIssueDetail, postLike } from "./func";

/**
 * 상세 이슈 조회 훅
 */
export const useGetIssue = ({
  id,
  enabled,
}: {
  id: string;
  enabled: boolean;
}) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["issue", id],
    queryFn: () => getIssueDetail({ id }),
    enabled: enabled,
  });
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
