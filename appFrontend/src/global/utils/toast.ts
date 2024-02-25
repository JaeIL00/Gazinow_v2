import Toast from 'react-native-toast-message';

export const showToast = (toastType: 'logout' | 'quit' | 'deleteRoute') => {
  Toast.show({
    type: toastType,
    position: 'bottom',
    visibilityTime: 2000,
  });
};
