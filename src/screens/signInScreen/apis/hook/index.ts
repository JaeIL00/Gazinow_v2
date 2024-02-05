import { useMutation } from 'react-query';
import { signInFetch, logoutFetch } from '../func';
import { SignInFetchResponse } from '../entity';

/**
 * 로그인 요청 훅
 */
export const useSignInMutation = ({
  onSuccess,
}: {
  onSuccess: (data: SignInFetchResponse) => void;
}) => {
  const { mutate: signInMutate } = useMutation(signInFetch, { onSuccess });
  return { signInMutate };
};

/**
 * 로그아웃 요청 훅
 */
export const useLogoutMutation = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutate: logoutMutate } = useMutation(logoutFetch, { onSuccess });
  return { logoutMutate };
};
