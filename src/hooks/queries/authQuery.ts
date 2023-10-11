import { useMutation } from 'react-query';

import { loginFetch, autoLoginFetch } from '@/apis/auth';

export const useLoginMutation = () => {
  const { mutate: loginFetching } = useMutation(loginFetch);
  return { loginFetching };
};

export const useAutoLoginMutation = () => {
  const { mutate: autoLoginFetching } = useMutation(autoLoginFetch);
  return { autoLoginFetching };
};
