import { tokenReissueFetch } from '@/global/apis/func';
import { getEncryptedStorage, removeEncryptedStorage, setEncryptedStorage } from '@/global/utils';
import { useAppDispatch, useAppSelect } from '@/store';
import { getAuthorizationState, saveUserInfo } from '@/store/modules';
import { useMutation } from 'react-query';

export const useTryAuthorization = () => {
  const dispatch = useAppDispatch();
  const isVerifiedUser = useAppSelect((state) => state.auth.isVerifiedUser);

  const { mutate } = useMutation(tokenReissueFetch, {
    onSuccess: async (data) => {
      dispatch(saveUserInfo({ nickname: data.nickName, email: data.email }));
      dispatch(getAuthorizationState('success auth'));
      await setEncryptedStorage('access_token', data.accessToken);
      await setEncryptedStorage('refresh_token', data.refreshToken);
    },
    onError: async () => {
      await removeEncryptedStorage('access_token');
      await removeEncryptedStorage('refresh_token');
      dispatch(getAuthorizationState('fail auth'));
    },
  });

  const tryAuthorization = async () => {
    const accessToken = await getEncryptedStorage('access_token');
    const refreshToken = await getEncryptedStorage('refresh_token');
    if (!accessToken) {
      dispatch(getAuthorizationState('fail auth'));
      return;
    } else {
      mutate({
        accessToken,
        refreshToken,
      });
    }
  };

  return {
    isVerifiedUser,
    tryAuthorization,
  };
};
