import { useMutation } from 'react-query';
import { signInFetch } from './func';
import { SignInFetchResponse } from './entity';
import { AxiosError } from 'axios';

/**
 * 로그인 요청 훅
 */
export const useSignInMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: SignInFetchResponse) => void;
  onError: (error: AxiosError) => void;
}) => {
  const { isLoading, mutate: signInMutate } = useMutation(signInFetch, { onSuccess, onError });
  return { isLoading, signInMutate };
};
