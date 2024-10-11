import { COLOR } from '@/global/constants';
import { FontText, TextButton } from '@/global/ui';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { Dimensions, View } from 'react-native';

const NonLoggedIn = () => {
  const navigation = useRootNavigation();
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('screen').height * 0.431,
        paddingBottom: 10,
        borderTopColor: COLOR.GRAY_EB,
        borderTopWidth: 1,
      }}
    >
      <FontText
        text={`로그인하고 자주 가는 경로의\n이슈를 바로 확인하세요`}
        className="text-center text-13 leading-16 text-gray-999"
        fontWeight="500"
      />
      <TextButton
        value="로그인"
        textSize="14px"
        textColor={COLOR.WHITE}
        textWeight="SemiBold"
        onPress={() => navigation.navigate('AuthStack', { screen: 'Landing' })}
        style={{
          backgroundColor: COLOR.BASIC_BLACK,
          width: 120,
          paddingVertical: 12,
          alignItems: 'center',
          borderRadius: 5,
          marginTop: 24,
        }}
      />
    </View>
  );
};

export default NonLoggedIn;
