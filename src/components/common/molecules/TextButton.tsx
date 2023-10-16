import { Pressable } from 'react-native';
import type { PressableProps } from 'react-native/types';

import { FontText } from '@/components/common/atoms';
import { COLOR } from '@/constants';

interface TextButtonProps extends PressableProps {
  value: string;
  textSize: string;
  textWeight: 'Bold' | 'SemiBold' | 'Medium' | 'Regular';
  textColor?: keyof typeof COLOR;
  lineHeight: string;
}

const TextButton = (props: TextButtonProps) => {
  const { value, style, textSize, textWeight, textColor, lineHeight, onPress } = props;

  return (
    <Pressable onPress={onPress} style={style}>
      <FontText
        value={value}
        textSize={textSize}
        textWeight={textWeight}
        textColor={textColor}
        lineHeight={lineHeight}
      />
    </Pressable>
  );
};

export default TextButton;
