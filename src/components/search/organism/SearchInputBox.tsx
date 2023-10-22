import { View } from 'react-native';

import { IconButton } from '@/components/common/molecules';

const SearchInputBox = () => {
  return (
    <View>
      <IconButton isFontIcon iconName="arrow-back-sharp" iconWidth="24" iconColor="#49454F" />
      <IconButton
        isFontIcon
        iconName="close-circle"
        iconWidth="19.5"
        iconColor="rgba(0, 0, 0, 0.46)"
      />
    </View>
  );
};

export default SearchInputBox;
