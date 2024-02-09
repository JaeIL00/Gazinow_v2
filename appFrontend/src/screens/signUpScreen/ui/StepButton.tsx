import { COLOR } from '@/global/constants';
import { TextButton } from '@/global/ui';
import { Platform, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface StepButtonProps {
  value: string;
  disabled?: boolean;
  backgroundCondition: boolean;
  onPress: () => void;
}

const StepButton = ({ value, disabled, backgroundCondition, onPress }: StepButtonProps) => {
  const StatusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : (StatusBar.currentHeight as number);
  return (
    <TextButton
      value={value}
      textSize="17px"
      textWeight="SemiBold"
      textColor={COLOR.WHITE}
      style={{
        backgroundColor: backgroundCondition ? COLOR.BASIC_BLACK : COLOR.GRAY_DDD,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        marginBottom: Platform.OS === 'ios' ? StatusBarHeight + 24 : 24,
      }}
      onPress={onPress}
      disabled={disabled}
    />
  );
};

export default StepButton;
