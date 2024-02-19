import styled from '@emotion/native';
import type { PressableProps } from 'react-native/types';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IconButtonProps extends PressableProps, IconStyleProps {
  iconType?: 'Ionicons' | 'FontAwesome' | 'Feather';
  isFontIcon: boolean;
  iconName?: string;
  iconColor?: string;
}

const IconButton = (props: IconButtonProps) => {
  const {
    iconType,
    isFontIcon,
    iconName,
    iconWidth,
    iconHeight,
    iconColor,
    onPress,
    hitSlop = 10,
  } = props;

  if (isFontIcon && iconName) {
    return (
      <Button onPress={onPress} hitSlop={10}>
        {iconType === 'Ionicons' && (
          <Ionicons name={iconName} size={Number(iconWidth)} color={iconColor} />
        )}
        {iconType === 'FontAwesome' && (
          <FontAwesome name={iconName} size={Number(iconWidth)} color={iconColor} />
        )}
        {iconType === 'Feather' && (
          <Feather name={iconName} size={Number(iconWidth)} color={iconColor} />
        )}
      </Button>
    );
  }
};

export default IconButton;

interface IconStyleProps {
  iconWidth?: string;
  iconHeight?: string;
}
const Button = styled.Pressable<IconStyleProps>`
  width: ${({ iconWidth }) => iconWidth};
  height: ${({ iconHeight }) => iconHeight};
`;
const IconImage = styled.Image`
  width: 100%;
  height: 100%;
`;
