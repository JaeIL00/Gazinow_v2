import { useMutation } from 'react-query';
import { emailConfirmFetch } from '../func';
import { useState } from 'react';

/**
 * 이메일 인증 요청 axios
 */
export const useEmailConfirm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [authNumber, setAuthNumber] = useState<string>('');
  const { mutate } = useMutation(emailConfirmFetch, {
    onSuccess: (data) => {
      setAuthNumber(data);
      onSuccess();
    },
  });

  const resetAuthNumber = () => {
    setAuthNumber('');
  };

  return { authNumber, resetAuthNumber, emailConfirmMutate: mutate };
};
