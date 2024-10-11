import { useMutation, useQuery } from 'react-query';
import {
  changePasswordFetch,
  checkPasswordFetch,
  deleteAccountFetch,
  logoutFetch,
  changeNicknameFetch,
  checkNicknameFetch,
  addPathNotiSettingsFetch,
  disablePathNotiFetch,
  updatePathNotiSettingsFetch,
  getPathNotiFetch,
  setPushNotiOnFetch,
  getPushNotiOnStatusFetch,
  getMyPathPushNotiOnStatusFetch,
  setMyPathPushNotiOnFetch,
  setDetailPushNotiOnFetch,
  getDetailPushNotiOnStatusFetch,
} from './func';
import { AxiosError } from 'axios';

/**
 * 로그아웃 요청 훅
 */
export const useLogoutMutation = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutate: logoutMutate } = useMutation(logoutFetch, { onSuccess });
  return { logoutMutate };
};

/**
 * 회원 탈퇴 훅
 */
export const useDeleteAccountMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: AxiosError) => void;
}) => {
  const { mutate: deleteAccountMutate } = useMutation(deleteAccountFetch, { onSuccess, onError });
  return { deleteAccountMutate };
};

/**
 * 비밀번호 확인 훅
 */
export const useCheckPasswordMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError?: (error: AxiosError) => void;
}) => {
  const { mutate: checkPasswordMutate } = useMutation(checkPasswordFetch, {
    onSuccess,
    onError,
  });
  return { checkPasswordMutate };
};

/**
 * 비밀번호 변경 훅
 */
export const useChangePasswordMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError?: (error: AxiosError) => void;
}) => {
  const { mutate: changePasswordMutate } = useMutation(changePasswordFetch, {
    onSuccess,
    onError,
  });
  return { changePasswordMutate };
};

/**
 * 닉네임 변경 훅
 */
export const useChangeNicknameMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError?: (error: AxiosError) => void;
}) => {
  const { mutate } = useMutation(changeNicknameFetch, {
    onSuccess,
    onError,
  });
  return { changeNicknameMutate: mutate };
};

/**
 * 닉네임 중복 검사 훅
 */
export const useCheckNicknameMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError?: (error: AxiosError) => void;
}) => {
  const { mutate } = useMutation(checkNicknameFetch, {
    onSuccess,
    onError,
  });
  return { checkNicknameMutate: mutate };
};

/**
 * 푸시 알림 on/off 설정 훅
 */
export const useSetPushNotiOnMutation = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutate } = useMutation(setPushNotiOnFetch, {
    onSuccess,
  });
  return { setPushNotiOnMutate: mutate };
};

/**
 * 푸시 알림 on/off 조회 훅
 */
export const useGetPushNotiOnStatusQuery = (email: string) => {
  const { data } = useQuery(['getPushNotiOnStatus'], () => getPushNotiOnStatusFetch(email));
  return { isPushNotiOn: data };
};

/**
 * 내가 저장한 경로 알림 on/off 설정 훅
 */
export const useSetMyPathPushNotiOnMutation = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutate } = useMutation(setMyPathPushNotiOnFetch, {
    onSuccess,
  });
  return { setMyPathPushNotiOnMutate: mutate };
};

/**
 * 내가 저장한 경로 알림 on/off 조회 훅
 */
export const useGetMyPathPushNotiOnStatusQuery = (email: string) => {
  const { data } = useQuery(['getMyPathPushNotiOnStatus'], () =>
    getMyPathPushNotiOnStatusFetch(email),
  );
  return { isMyPathPushNotiOn: data };
};

/**
 * 경로 상세 설정 알림 on/off 설정 훅
 */
export const useSetDetailPushNotiOnMutation = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutate } = useMutation(setDetailPushNotiOnFetch, {
    onSuccess,
  });
  return { setDetailPushNotiOnMutate: mutate };
};

/**
 * 경로 상세 설정 알림 on/off 조회 훅
 */
export const useGetDetailPushNotiOnStatusQuery = (email: string) => {
  const { data } = useQuery(['getDetailPushNotiOnStatus'], () =>
    getDetailPushNotiOnStatusFetch(email),
  );
  return { isDetailPushNotiOn: data };
};

/**
 * 알림 비활성화 훅
 */
export const useDisablePathNotiMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError?: (error: AxiosError) => void;
}) => {
  const { mutate } = useMutation(disablePathNotiFetch, {
    onSuccess,
    onError,
  });
  return { disablePathNotiMutate: mutate };
};

/**
 * 알림 설정 등록 훅
 */
export const useAddPathNotiSettingsMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError?: (error: AxiosError) => void;
}) => {
  const { mutate } = useMutation(addPathNotiSettingsFetch, {
    onSuccess,
    onError,
  });
  return { addPathNotiSettingsMutate: mutate };
};

/**
 * 알림 설정 수정 훅
 */
export const usePathUpdateNotiSettingsMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError?: (error: AxiosError) => void;
}) => {
  const { mutate } = useMutation(updatePathNotiSettingsFetch, {
    onSuccess,
    onError,
  });
  return { updatePathNotiSettingsMutate: mutate };
};

/**
 * 경로별 알림 설정 불러오기 훅
 */
export const useGetPathNotiQuery = (myPathId: number) => {
  const { data } = useQuery(['getPathNoti'], () => getPathNotiFetch(myPathId));
  return { pathNotiData: data };
};
