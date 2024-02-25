import React from 'react';
import ToastLogout from '@assets/icons/toast_logout.svg';
import ToastQuit from '@assets/icons/toast_quit.svg';
import ToastDeleteRoute from '@assets/icons/toast_route_deleted.svg';

const ToastConfig = {
  logout: () => <ToastLogout />,
  quit: () => <ToastQuit />,
  deleteRoute: () => <ToastDeleteRoute />,
};

export default ToastConfig;
