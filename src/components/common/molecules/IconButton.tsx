import styled from '@emotion/native';
import type { PressableProps } from 'react-native/types';

import { iconPath } from '@/assets/icons/iconPath';
import type { IconPathTypes } from '@/assets/icons/iconPath';

interface IconButtonProps extends PressableProps, IconStyleProps {
  iconName: keyof IconPathTypes;
}

const IconButton = (props: IconButtonProps) => {
  const { iconName, iconWidth, iconHeight, onPress } = props;

  return (
    <Button onPress={onPress} iconWidth={iconWidth} iconHeight={iconHeight} hitSlop={10}>
      <IconImage source={iconPath[iconName]} />
    </Button>
  );
};

export default IconButton;

interface IconStyleProps {
  iconWidth: string;
  iconHeight: string;
}
const Button = styled.Pressable<IconStyleProps>`
  width: ${({ iconWidth }) => iconWidth};
  height: ${({ iconHeight }) => iconHeight};
`;
const IconImage = styled.Image`
  width: 100%;
  height: 100%;
`;
