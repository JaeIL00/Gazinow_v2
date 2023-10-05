import { useMutation } from 'react-query';

import { loginFetch } from '@/apis/auth';

export const useLoginMutation = () => {
  return useMutation(loginFetch);
};
