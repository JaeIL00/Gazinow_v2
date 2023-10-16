import type { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native/types';

import { NormalTextProps } from '../atoms/NormalText';
import { TouchButtonProps } from '../atoms/TouchButton';
import { NormalText, TouchButton } from '@/components/common';

interface TextButtonProps extends TouchButtonProps, NormalTextProps {
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
    <TouchButton {...props}>
      <NormalText {...props} value={value} />
    </TouchButton>
  );
};

export default TextButton;
