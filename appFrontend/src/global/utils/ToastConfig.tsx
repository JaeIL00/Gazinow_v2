import React from 'react';
import Toast from '../ui/Toast';

export type ToastType = 'logout' | 'quit' | 'deleteRoute' | 'saveRoute' | 'nickNameChanged';

const ToastConfig = {
  logout: () => <Toast text="로그아웃 되었어요" />,
  quit: () => <Toast text="탈퇴되었어요" />,
  deleteRoute: () => <Toast text="경로가 삭제되었어요" />,
  saveRoute: () => <Toast text="경로를 저장했어요" />,
  nickNameChanged: () => <Toast text="닉네임이 변경되었어요" />,
};

export default ToastConfig;
