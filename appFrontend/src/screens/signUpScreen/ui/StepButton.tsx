import LoadingDots from '@/global/components/animations/LoadingDots';
import { COLOR } from '@/global/constants';
import { TextButton } from '@/global/ui';
import { View } from 'react-native';
import cn from 'classname';

interface StepButtonProps {
  value: string;
  disabled?: boolean;
  backgroundCondition: boolean;
  onPress: () => void;
  isLoading?: boolean;
}

const StepButton = ({
  value,
  disabled,
  backgroundCondition,
  onPress,
  isLoading,
}: StepButtonProps) => {
  return (
    <>
      {isLoading ? (
        <View className="bg-black-17 rounded-5 items-center justify-center h-48 mb-41 pt-8">
          <LoadingDots width={200} height={90} />
        </View>
      ) : (
        <TextButton
          value={value}
          textSize="17px"
          textWeight="SemiBold"
          textColor={COLOR.WHITE}
          className={cn('rounded-5 items-center justify-center h-48 mb-41', {
            'bg-black-17': backgroundCondition,
            'bg-gray-dd': !backgroundCondition,
          })}
          onPress={onPress}
          disabled={disabled}
        />
      )}
    </>
  );
};

export default StepButton;
