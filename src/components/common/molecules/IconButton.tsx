import styled from '@emotion/native';
import type { PressableProps } from 'react-native/types';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { iconPath } from '@/assets/icons/iconPath';
import type { IconPathTypes } from '@/assets/icons/iconPath';

interface IconButtonProps extends PressableProps, IconStyleProps {
  isFontIcon: boolean;
  iconName?: string;
  imagePath?: keyof IconPathTypes;
  iconColor?: string;
}

const IconButton = (props: IconButtonProps) => {
  const { isFontIcon, iconName, imagePath, iconWidth, iconHeight, iconColor, onPress } = props;

  if (isFontIcon && iconName) {
    return (
      <Button onPress={onPress} hitSlop={10}>
        <Ionicons name={iconName} size={Number(iconWidth)} color={iconColor} />
      </Button>
    );
  } else if (imagePath) {
    return (
      <Button onPress={onPress} iconWidth={iconWidth} iconHeight={iconHeight} hitSlop={10}>
        <IconImage source={iconPath[imagePath]} />
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
