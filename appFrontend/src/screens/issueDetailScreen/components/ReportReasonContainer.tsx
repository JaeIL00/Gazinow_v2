import { FontText } from '@/global/ui';
import { Pressable, View } from 'react-native';
import cn from 'classname';

const ReportReasonContainer = ({
  reason,
  text,
  isSelected,
  onSelect,
  isFirstReason,
}: {
  reason: string;
  text: string;
  isSelected: boolean;
  onSelect: () => void;
  isFirstReason: boolean;
}) => (
  <Pressable
    onPress={onSelect}
    hitSlop={5}
    className={cn('flex-row space-x-8 mt-12', {
      'mt-0': isFirstReason,
      'items-center': reason.startsWith('OTHER'),
    })}
  >
    <View
      className={cn('w-20 h-20 rounded-full border-1 items-center justify-center border-gray-ddd', {
        'border-light-blue': isSelected,
        'top-4': !reason.startsWith('OTHER'),
      })}
    >
      {isSelected && <View className="rounded-full w-11 h-11 bg-light-blue" />}
    </View>
    <FontText text={text} className="flex-1 text-14 leading-21" fontWeight="500" />
  </Pressable>
);
export default ReportReasonContainer;
