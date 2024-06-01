import Toast from 'react-native-toast-message';
import { ToastType } from './ToastConfig';

export const showToast = (toastType: ToastType) => {
  Toast.show({
    type: toastType,
    position: 'bottom',
    bottomOffset: 30,
    visibilityTime: 2000,
  });
};
