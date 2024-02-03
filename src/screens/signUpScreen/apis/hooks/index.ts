import { useMutation } from 'react-query';
import { emailConfirmFetch } from '../func';

/**
 * 이메일 인증 요청 axios
 */
export const useEmailConfirm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { data, mutate } = useMutation(emailConfirmFetch, {
    onSuccess,
  });

  return { authNumber: data, emailConfirmMutate: mutate };
};
