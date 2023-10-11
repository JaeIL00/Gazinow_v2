import { Pressable } from 'react-native';
import type {
  GestureResponderEvent,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native/types';

import { NormalText } from '@/components/common';
import type { NormalTextProps } from '@/components/common/atoms/NormalText';

interface TextButtonProps extends PressableProps, NormalTextProps {
  children?: React.ReactNode | undefined;
  disabled?: boolean | undefined;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  onPressIn?: ((event: GestureResponderEvent) => void) | undefined;
  onPressOut?: ((event: GestureResponderEvent) => void) | undefined;
  onLongPress?: ((event: GestureResponderEvent) => void) | undefined;
  style?: StyleProp<ViewStyle | TextStyle> | undefined;
}

const TextButton = (props: TextButtonProps) => {
  const { value } = props;

  return (
    <Pressable {...props}>
      <NormalText {...props} value={value} />
    </Pressable>
  );
};

export default TextButton;
