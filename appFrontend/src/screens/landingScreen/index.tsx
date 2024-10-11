import { COLOR } from '@/global/constants';
import { FontText } from '@/global/ui';
import { useAuthNavigation } from '@/navigation/AuthNavigation';
import { Animated, Pressable, SafeAreaView, TouchableOpacity, View } from 'react-native';
import IconLeftArrow from '@assets/icons/left_arrow_head.svg';

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
            text="가는길 지금,"
            className="text-27 leading-[36.454px] text-white"
            fontWeight="700"
          />
          <FontText
            text={`무슨 일이\n일어나고 있을까요?`}
            className="text-27 leading-[36.454px] text-white"
          />
        </View>

        <View style={{ flex: 1 }} />

        <View
          style={{
            marginBottom: 83,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Pressable hitSlop={20} onPress={() => navigation.navigate('SignIn')}>
            <FontText text="이메일 로그인" className="text-white text-13" fontWeight="500" />
          </Pressable>
          <View style={{ marginHorizontal: 8 }}>
            <FontText text="|" className="text-white text-13" />
          </View>
          <Pressable hitSlop={20} onPress={() => navigation.navigate('SignUp')}>
            <FontText text="이메일 회원가입" className="text-white text-13" fontWeight="500" />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};
export default LandingScreen;
