import { Pressable } from 'react-native';
import type { PressableProps } from 'react-native/types';

import { FontText } from '@/components/common/atoms';

interface TextButtonProps extends PressableProps {
  value: string;
  textSize: string;
  textWeight: 'Bold' | 'SemiBold' | 'Medium' | 'Regular';
}

const TextButton = (props: TextButtonProps) => {
  const { value, style, textSize, textWeight, onPress } = props;

  return (
    <Pressable onPress={onPress} style={style}>
      <FontText value={value} textSize={textSize} textWeight={textWeight} />
    </Pressable>
  );
};

export default TextButton;
