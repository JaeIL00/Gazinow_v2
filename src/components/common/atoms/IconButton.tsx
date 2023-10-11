import { Image, Pressable } from 'react-native';
import type { PressableProps } from 'react-native/types';

import { iconPath } from '@/assets/icons/iconPath';
import type { IconPathTypes } from '@/assets/icons/iconPath';

interface IconButtonProps extends PressableProps {
  iconName: keyof IconPathTypes;
}

const IconButton = (props: IconButtonProps) => {
  const { iconName } = props;

  return (
    <Pressable {...props}>
      <Image source={iconPath[iconName]} />
    </Pressable>
  );
};

export default IconButton;
