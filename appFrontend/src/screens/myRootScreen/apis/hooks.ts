import { useMutation } from 'react-query';
import {
  changePasswordFetch,
  checkPasswordFetch,
  deleteAccountFetch,
  logoutFetch,
  changeNicknameFetch,
  checkNicknameFetch,
} from './func';

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
  onError: (error: any) => void;
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
  onError?: (error: any) => void;
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
  onError?: (error: any) => void;
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
  onError?: (error: any) => void;
}) => {
  const { data, mutate } = useMutation(changeNicknameFetch, {
    onSuccess,
    onError,
  });
  return { data, changeNicknameMutate: mutate };
};

/**
 * 닉네임 중복 검사 훅
 */
export const useCheckNicknameMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError?: (error: any) => void;
}) => {
  const { data, mutate } = useMutation(checkNicknameFetch, {
    onSuccess,
    onError,
  });
  return { data, checkNicknameMutate: mutate };
};
