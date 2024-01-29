import { useMutation } from 'react-query';
import { loginFetch, logoutFetch } from '../func';
import { LoginFetchResponse } from '../entity';

/**
 * 로그인 요청 훅
 */
export const useLoginMutation = ({
  onSuccess,
}: {
  onSuccess: (data: LoginFetchResponse) => void;
}) => {
  const { mutate: loginMutate } = useMutation(loginFetch, { onSuccess });
  return { loginMutate };
};

/**
 * 로그아웃 요청 훅
 */
export const useLogoutMutation = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutate: logoutMutate } = useMutation(logoutFetch, { onSuccess });
  return { logoutMutate };
};
