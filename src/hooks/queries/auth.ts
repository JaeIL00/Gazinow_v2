import { useMutation } from 'react-query';

import { loginFetch, autoLoginFetch } from '@/apis/auth';

export const useLoginMutation = () => {
  return useMutation(loginFetch);
};

export const useAutoLoginMutation = () => {
  const { data, mutate: autoLoginFetching } = useMutation(autoLoginFetch);

  return { data, autoLoginFetching };
};
