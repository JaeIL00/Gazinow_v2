import { useMutation } from 'react-query';
import { logoutFetch } from './func';

/**
 * 로그아웃 요청 훅
 */
export const useLogoutMutation = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutate: logoutMutate } = useMutation(logoutFetch, { onSuccess });
  return { logoutMutate };
};
