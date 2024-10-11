import { useMutation } from 'react-query';
import { sendFirebaseTokenFetch } from './func';
import { SignInFetchResponse } from './entity';
import { AxiosError } from 'axios';

/**
 * 소셜 로그인 firebaseToken 전송 훅
 */
export const useSendFirebaseToken = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: SignInFetchResponse) => void;
  onError: (error: AxiosError) => void;
}) => {
  const { mutate: sendFirebaseTokenMutate } = useMutation(sendFirebaseTokenFetch, {
    onSuccess,
    onError,
  });
  return { sendFirebaseTokenMutate };
};
