import { View } from 'react-native';
import { FontText } from '.';
import { COLOR } from '../constants';
import ToastCheck from '@assets/icons/toast_check.svg';

interface ToastProps {
  text: string;
}

const Toast = ({ text }: ToastProps) => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 14,
        backgroundColor: '#00000080',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 999,
      }}
    >
      <ToastCheck />
      <FontText
        value={text}
        textSize="14px"
        textWeight="Medium"
        textColor={COLOR.WHITE}
        style={{ marginLeft: 10 }}
      />
    </View>
  );
};

export default Toast;
