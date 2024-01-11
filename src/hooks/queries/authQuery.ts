import { useMutation } from 'react-query';

import { loginFetch } from '@/apis/auth';
import { LoginFetchResponse } from '@/types/apis';

export const useLoginMutation = ({
  onSuccess,
}: {
  onSuccess: (data: LoginFetchResponse) => void;
}) => {
  const { mutate: loginMutate } = useMutation(loginFetch, { onSuccess });
  return { loginMutate };
};
