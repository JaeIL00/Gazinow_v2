import { COLOR } from '@/global/constants';
import { TextButton } from '@/global/ui';

interface StepButtonProps {
  value: string;
  disabled?: boolean;
  backgroundCondition: boolean;
  onPress: () => void;
}

const StepButton = ({ value, disabled, backgroundCondition, onPress }: StepButtonProps) => {
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
        marginBottom: 24,
      }}
      onPress={onPress}
      disabled={disabled}
    />
  );
};

export default StepButton;
