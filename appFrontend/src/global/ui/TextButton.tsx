import { Pressable, View } from 'react-native';
import type { PressableProps } from 'react-native/types';
import FontText from './FontText';
import { COLOR } from '../constants';

interface TextButtonProps extends PressableProps {
  text: string;
  isTextUnderline?: boolean;
}

const TextButton = (props: TextButtonProps) => {
  const { value, style, isTextUnderline, onPress } = props;

  return (
    <Pressable {...props} onPress={onPress} style={style}>
      <FontText
        text={value}
        textSize={textSize}
        textWeight={textWeight}
        textColor={textColor}
        lineHeight={lineHeight}
      />
      {isTextUnderline && (
        <View style={{ borderBottomWidth: 1.5, borderBottomColor: COLOR.GRAY_999 }} />
      )}
    </Pressable>
  );
};

export default TextButton;
