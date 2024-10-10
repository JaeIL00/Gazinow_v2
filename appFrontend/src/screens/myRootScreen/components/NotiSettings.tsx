import { FontText, TextButton, Toggle } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useMyPageNavigation } from '@/navigation/MyPageNavigation';
import { useGetSavedRoutesQuery } from '@/global/apis/hooks';
import MoreBtn from '@/assets/icons/moreBtn.svg';
import IconExclamation from '@assets/icons/circle_exclamation_mark.svg';
import { useRootNavigation } from '@/navigation/RootNavigation';
import {
  useGetDetailPushNotiOnStatusQuery,
  useGetMyPathPushNotiOnStatusQuery,
  useGetPushNotiOnStatusQuery,
  useSetDetailPushNotiOnMutation,
  useSetMyPathPushNotiOnMutation,
  useSetPushNotiOnMutation,
} from '../apis/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { useQueryClient } from 'react-query';

const NotiSettings = () => {
  const myPageNavigation = useMyPageNavigation();
  const rootNavigation = useRootNavigation();
  const queryClient = useQueryClient();
  const { email } = useSelector((state: RootState) => state.auth);

  const { myRoutes } = useGetSavedRoutesQuery();

  // 토글 on/off 여부
  const { isPushNotiOn } = useGetPushNotiOnStatusQuery(email);
  const { isMyPathPushNotiOn } = useGetMyPathPushNotiOnStatusQuery(email);
  const { isDetailPushNotiOn } = useGetDetailPushNotiOnStatusQuery(email);

  // 토글 on/off 설정
  const { setPushNotiOnMutate } = useSetPushNotiOnMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries(['getPushNotiOnStatus']);
      await queryClient.invalidateQueries(['getMyPathPushNotiOnStatus']);
      await queryClient.invalidateQueries(['getDetailPushNotiOnStatus']);
    },
  });
  const { setMyPathPushNotiOnMutate } = useSetMyPathPushNotiOnMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries(['getMyPathPushNotiOnStatus']);
      await queryClient.invalidateQueries(['getDetailPushNotiOnStatus']);
    },
  });
  const { setDetailPushNotiOnMutate } = useSetDetailPushNotiOnMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries(['getDetailPushNotiOnStatus']);
    },
  });

  return (
    <>
      <View className="h-1 bg-gray-eb" />
      <View className="flex-row mx-16 h-53 items-center justify-between">
        <TextButton
          value="푸시 알림 받기"
          textSize="16px"
          textWeight="SemiBold"
          textColor={isPushNotiOn ? COLOR.BASIC_BLACK : COLOR.GRAY_BE}
        />
        <Toggle
          isOn={isPushNotiOn!}
          onToggle={() => setPushNotiOnMutate({ email, alertAgree: !isPushNotiOn })}
        />
      </View>
      <View className="h-20 bg-gray-f9" />
      <View className="flex-row mx-16 h-53 items-center justify-between">
        <TextButton
          value="내가 저장한 경로 알림"
          textSize="16px"
          textWeight="SemiBold"
          textColor={isMyPathPushNotiOn ? COLOR.BASIC_BLACK : COLOR.GRAY_BE}
        />
        <Toggle
          isOn={isMyPathPushNotiOn!}
          onToggle={() => setMyPathPushNotiOnMutate({ email, alertAgree: !isMyPathPushNotiOn })}
          disabled={!isPushNotiOn}
        />
      </View>
      <View className="h-1 bg-gray-eb" />
      {myRoutes && myRoutes.length > 0 && (
        <>
          <View className="flex-row mx-16 h-72 items-center justify-between">
            <View className="gap-6">
              <TextButton
                value="경로 상세 설정"
                textSize="16px"
                textWeight="SemiBold"
                textColor={isDetailPushNotiOn ? COLOR.BASIC_BLACK : COLOR.GRAY_BE}
              />
              <TextButton
                value="개별 경로의 알림이 활성화되는 시간을 설정해요"
                textSize="12px"
                textWeight="Regular"
                lineHeight={14}
                textColor={isDetailPushNotiOn ? COLOR.BASIC_BLACK : COLOR.GRAY_BE}
              />
            </View>
            <Toggle
              isOn={isDetailPushNotiOn!}
              onToggle={() => setDetailPushNotiOnMutate({ email, alertAgree: !isDetailPushNotiOn })}
              disabled={!isPushNotiOn || !isMyPathPushNotiOn}
            />
          </View>
          <View className="h-1 bg-gray-eb" />
        </>
      )}
      {isMyPathPushNotiOn && isDetailPushNotiOn && myRoutes && myRoutes.length > 0 && (
        <ScrollView>
          {myRoutes.map((myRoutes, index) => (
            <View key={myRoutes.roadName + index}>
              <TouchableOpacity
                className="flex-row ml-24 mr-16 h-53 items-center justify-between"
                onPress={() => myPageNavigation.push('NotiSettingsDetailScreen', { myRoutes })}
              >
                <FontText
                  value={myRoutes.roadName}
                  textColor={COLOR.GRAY_999}
                  textSize="16px"
                  textWeight="Medium"
                />
                <View className="flex-row items-center">
                  <FontText
                    value="편집"
                    textColor={COLOR.GRAY_999}
                    textSize="13px"
                    textWeight="Regular"
                    lineHeight={19}
                  />
                  <MoreBtn height={19} className="ml-4" />
                </View>
              </TouchableOpacity>
              <View className="h-1 bg-gray-eb" />
            </View>
          ))}
        </ScrollView>
      )}
      {isMyPathPushNotiOn && myRoutes && myRoutes.length < 1 && (
        <View className="mx-16 mt-20 py-16 bg-gray-f9 items-center rounded-12">
          <View className="flex-row items-center">
            <IconExclamation />
            <FontText
              className="pl-5 text-gray-99"
              value={'저장한 경로가 아직 없어요'}
              textSize={'14'}
              textWeight={'Regular'}
            />
          </View>
          <TouchableOpacity>
            <TextButton
              className="mt-8"
              value={'내 경로 저장하고 알림받기'}
              textSize={'13'}
              textWeight={'SemiBold'}
              textColor="#999999"
              onPress={() =>
                rootNavigation.navigate('NewRouteNavigation', { screen: 'SavedRoutes' })
              }
              isTextUnderline
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
export default NotiSettings;
