import { ImageSourcePropType } from 'react-native';

export interface IconPathTypes {
  exchange_gray: ImageSourcePropType;
  location_pin_gray: ImageSourcePropType;
  issue_rain: ImageSourcePropType;
  issue_rain_bottom: ImageSourcePropType;
  more_gray: ImageSourcePropType;
}

export const iconPath: IconPathTypes = {
  exchange_gray: require('@/assets/icons/exchange_gray.png'),
  location_pin_gray: require('@/assets/icons/location_pin_gray.png'),
  issue_rain: require('@/assets/icons/ico_issue.png'),
  issue_rain_bottom: require('@/assets/icons/ico_issueBottom.png'),
  more_gray: require('@/assets/icons/ico_more.png'),
};
