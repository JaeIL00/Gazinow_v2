import { ImageSourcePropType } from 'react-native';

export interface IconPathTypes {
  exchange_gray: ImageSourcePropType;
  location_pin_gray: ImageSourcePropType;
}

export const iconPath: IconPathTypes = {
  exchange_gray: require('@/assets/icons/exchange_gray.png'),
  location_pin_gray: require('@/assets/icons/location_pin_gray.png'),
};
