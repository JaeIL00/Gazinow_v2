import { Pressable } from 'react-native';
import type { PressableProps } from 'react-native/types';

import { NormalText } from '@/components/common/atoms';

interface TextButtonProps extends PressableProps {
  value: string;
  textSize?: string;
}

const TextButton = (props: TextButtonProps) => {
  const { value, style, textSize, onPress } = props;

  return (
    <Pressable onPress={onPress} style={style}>
      <NormalText value={value} textSize={textSize} />
    </Pressable>
  );
};

export default TextButton;
