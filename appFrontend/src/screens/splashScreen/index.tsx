import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useAppDispatch } from '@/store';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { tokenReissueFetch } from '@/global/apis/func';
import { saveUserInfo } from '@/store/modules';
import { getEncryptedStorage, removeEncryptedStorage, setEncryptedStorage } from '@/global/utils';
import SplashScreenLib from 'react-native-splash-screen';

// 자동로그인, 비로그인
// 적정 시간잡아서
// 하이드해주면 됩니다
// 둘다 1초 해도 되지 않을까싶은데
// 보고서 settimeout추가해주세요
// 자동로그인은 로그인 결과를 기점으로 셋타임하면 되고요
// 비로그인은 토큰 여부 판단이끝나고서 시작때하명 될거같습니다

const SplashScreen = () => {
  const rootNavigation = useRootNavigation();
  const dispatch = useAppDispatch();
  const { mutate } = useMutation(tokenReissueFetch, {
    onSuccess: async (data) => {
      dispatch(saveUserInfo({ nickname: data.nickName, email: data.email }));
      await setEncryptedStorage('access_token', data.accessToken);
      await setEncryptedStorage('refresh_token', data.refreshToken);
      rootNavigation.reset({ routes: [{ name: 'MainBottomTab' }] });
    },
    onError: () => {
      removeEncryptedStorage('access_token');
      removeEncryptedStorage('refresh_token');
      rootNavigation.reset({ routes: [{ name: 'AuthStack' }] });
    },
  });

  const firstAuthorization = async () => {
    const accessToken = await getEncryptedStorage('access_token');
    const refreshToken = await getEncryptedStorage('refresh_token');
    if (!accessToken) {
      rootNavigation.reset({ routes: [{ name: 'AuthStack' }] });
      return;
    } else {
      mutate({
        accessToken,
        refreshToken,
      });
    }
  };

  useEffect(() => {
    firstAuthorization();
    SplashScreenLib.hide();
  }, []);

  //   return (
  //     <View>
  //       <FontText value="자동 로그인 중" textSize="16px" textWeight="Bold" />
  //     </View>
  //   );
};

export default SplashScreen;
