import { useMutation } from 'react-query';
import { checkNicknameFetch, emailConfirmFetch, signUpFetch } from '../func';
import { useState } from 'react';
import { SightUpResponse } from '../../type';

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

/**
 * 닉네임 중복 확인 axios
 */
export const useCheckNickname = ({
  onSettled,
}: {
  onSettled: (
    data?: { message: string; state: 200 | 409 },
    error?: { message: string } | null,
  ) => void;
}) => {
  const { data, mutate: checkNicknameMutate } = useMutation(checkNicknameFetch, {
    onSettled,
  });

  return { data, checkNicknameMutate };
};

/**
 * 닉네임 중복 확인 axios
 */
export const useSighUp = ({ onSuccess }: { onSuccess: (data: SightUpResponse) => void }) => {
  const { mutate: signUpMutate } = useMutation(signUpFetch, {
    onSuccess,
  });

  return { signUpMutate };
};
