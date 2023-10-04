import { Pressable } from 'react-native';
import type { PressableProps } from 'react-native/types';

interface TouchButtonProps extends PressableProps {}

const TouchButton = (props: TouchButtonProps) => {
  return <Pressable {...props} />;
};

export default TouchButton;
