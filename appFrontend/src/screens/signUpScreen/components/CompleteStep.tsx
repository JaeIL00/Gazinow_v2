import { COLOR } from '@/global/constants';
import { FontText, Space } from '@/global/ui';
import { useAppSelect } from '@/store';
import { Image, View } from 'react-native';
import StepButton from '../ui/StepButton';
import { useRootNavigation } from '@/navigation/RootNavigation';

const CompleteStep = () => {
  const navigation = useRootNavigation();
  const authInfo = useAppSelect((state) => state.auth);

  return (
    <View style={{ flex: 1 }}>
      <FontText
        value={`${authInfo.nickname}님의 \n회원가입을 축하드립니다!`}
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
        onPress={() => navigation.reset({ routes: [{ name: 'MainBottomTab' }] })}
      />
    </View>
  );
};

export default CompleteStep;
