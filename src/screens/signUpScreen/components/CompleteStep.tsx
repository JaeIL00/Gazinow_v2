import { COLOR } from '@/global/constants';
import { FontText, Space, TextButton } from '@/global/ui';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { useAppSelect } from '@/store';
import { Image, View } from 'react-native';
import StepButton from '../ui/StepButton';

const CompleteStep = () => {
  const navigation = useRootNavigation();
  const userNickname = useAppSelect((state) => state.auth.nickname);

  return (
    <View style={{ flex: 1 }}>
      <FontText
        value={`${userNickname}님의 \n회원가입을 축하드립니다!`}
        textSize="24px"
        textWeight="Bold"
        textColor={COLOR.BASIC_BLACK}
      />

      <Space height="52px" />

      <View
        style={{
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Image
          source={require('../../../assets/images/clap_3d.png')}
          style={{ width: 328, height: 342 }}
        />
      </View>

      <StepButton
        value="확인"
        backgroundCondition={true} // 검정을 의미함
        onPress={() => {
          // FIXME: 이동 조건 추가하기, 토큰받았는지? 닉네임 이메일이 잘있는지?
          // navigation.reset({ routes: [{ name: 'MainBottomTab' }] });
        }}
      />
    </View>
  );
};

export default CompleteStep;
