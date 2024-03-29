import Toast from 'react-native-toast-message';
import { ToastType } from './ToastConfig';

export const showToast = (toastType: ToastType) => {
  Toast.show({
    type: toastType,
    position: 'bottom',
    visibilityTime: 2000,
  });
};
