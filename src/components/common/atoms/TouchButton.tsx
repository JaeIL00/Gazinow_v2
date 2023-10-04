import { Pressable } from 'react-native';
import type { PressableProps } from 'react-native/types';

export interface TouchButtonProps extends PressableProps {}

const TouchButton = (props: TouchButtonProps) => {
  const { children } = props;

  return <Pressable {...props}>{children}</Pressable>;
};

export default TouchButton;
