import { COLOR } from '@/global/constants';
import { FontText, TextButton } from '@/global/ui';
import { useAuthNavigation } from '@/navigation/AuthNavigation';
import { Animated, SafeAreaView, TouchableOpacity, View } from 'react-native';
import IconLeftArrow from '@assets/icons/left_arrow_head.svg';
import SocialLogin from './components/SocialLogin';

const LandingScreen = () => {
  const navigation = useAuthNavigation();

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.54)',
          position: 'absolute',
          top: 0,
          zIndex: 1,
        }}
      />
      <Animated.Image
        source={require('@assets/images/landing_background.png')}
        style={{ width: '100%', height: '100%' }}
        blurRadius={1.25}
      />
      <SafeAreaView
        style={{
          position: 'absolute',
          top: 0,
          zIndex: 2,
          height: '100%',
          width: '100%',
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: 32,
            height: 32,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 16,
          }}
          onPress={() => navigation.goBack()}
        >
          <IconLeftArrow color={COLOR.WHITE} />
        </TouchableOpacity>

        <View style={{ marginLeft: 37, marginTop: 68 }}>
          <FontText
            value="가는길 지금,"
            textSize="27.34px"
            textWeight="Bold"
            lineHeight="36.454px"
            textColor={COLOR.WHITE}
          />
          <FontText
            value={`무슨 일이\n일어나고 있을까요?`}
            textSize="27.34px"
            textWeight="Regular"
            lineHeight="36.454px"
            textColor={COLOR.WHITE}
          />
        </View>

        <View style={{ flex: 1 }} />

        <SocialLogin />

        <View
          style={{
            marginBottom: 83,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <TextButton
            value="이메일 로그인"
            textSize="13px"
            textWeight="Medium"
            textColor={COLOR.WHITE}
            onPress={() => navigation.navigate('SignIn')}
            hitSlop={20}
          />
          <FontText
            value="|"
            textSize="13px"
            textWeight="Regular"
            textColor={COLOR.WHITE}
            style={{ marginHorizontal: 8 }}
          />
          <TextButton
            value="이메일 회원가입"
            textSize="13px"
            textWeight="Medium"
            textColor={COLOR.WHITE}
            onPress={() => navigation.navigate('SignUp')}
            hitSlop={20}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
export default LandingScreen;
