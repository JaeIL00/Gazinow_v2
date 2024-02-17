import { useMutation, useQuery } from "@tanstack/react-query";
import { getIssueDetail, postLike } from "./func";

/**
 * 상세 이슈 조회 훅
 */
export const useGetIssue = (id: string) => {
  const { data } = useQuery({
    queryKey: ["issue", id],
    queryFn: () => getIssueDetail({ id }),
  });
  return { issueData: data };
};

/**
 * 상세 이슈 조회 훅
 */
export const usePostLike = () => {
  const { mutate } = useMutation({ mutationFn: postLike });
  return { doLikeMutate: mutate };
};
