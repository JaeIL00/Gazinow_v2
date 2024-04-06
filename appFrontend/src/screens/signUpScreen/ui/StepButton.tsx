import LoadingDots from '@/global/components/animations/LoadingDots';
import { COLOR } from '@/global/constants';
import { TextButton } from '@/global/ui';
import { View } from 'react-native';

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
        <View
          style={{
            backgroundColor: COLOR.BASIC_BLACK,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            height: 48,
            marginBottom: 41,
            paddingTop: 8,
          }}
        >
          <LoadingDots width={200} height={90} />
        </View>
      ) : (
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
            marginBottom: 41,
          }}
          onPress={onPress}
          disabled={disabled}
        />
      )}
    </>
  );
};

export default StepButton;
