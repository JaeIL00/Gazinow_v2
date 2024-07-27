import { FontText } from '@/global/ui';
import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import IconLeftArrowHead from '@assets/icons/left_arrow_head.svg';
import IconNoNoti from '@assets/icons/no_result_icon.svg';
import TextNoNoti from '@/assets/icons/no_result_text.svg';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { COLOR } from '@/global/constants';
import { useAppDispatch } from '@/store';
import { getIssueId } from '@/store/modules';
import IssueKeywordIcon from '@/global/components/IssueKeywordIcon';

const NotiHistory = () => {
  const navigation = useRootNavigation();
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row p-16 items-center justify-between">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconLeftArrowHead color="#3F3F46" width={24} />
        </TouchableOpacity>

        <FontText value="알림" textSize="18px" lineHeight={23} textWeight="Medium" />

        <TouchableOpacity
          onPress={() => navigation.push('MyPageNavigation', { screen: 'NotiSettingsScreen' })}
          hitSlop={20}
        >
          {/* TODO: 아이콘 교체 */}
          <IconLeftArrowHead color="#3F3F46" width={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={['undefined', 'sadfsfd', 'ewsdff']}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                // dispatch(getIssueId(item.id));
                navigation.navigate('IssueStack', { screen: 'IssueDetail' });
              }}
              className="flex-row px-16 py-20 border-b-1 border-gray-eb"
            >
              {/* TODO: 아이콘, 알림 내용, 시간 바꾸기 */}
              {/* TODO: 읽은 알림은 회색으로 */}
              {/* <IssueKeywordIcon keyword={item.keyword} color={'black'} width={24} height={24} /> */}
              <IssueKeywordIcon keyword={'자연재해'} color="black" width={24} height={24} />
              <View className="flex-1 ml-12 mr-32">
                <FontText
                  value={`출근길 경로에 [${item}] 이슈가 생겼어요`}
                  numberOfLines={2}
                  textSize="14"
                  lineHeight={21}
                  textWeight="SemiBold"
                />
                <View className="h-4" />
                <FontText
                  value={`4호선 신용산역-사당역 방면`}
                  numberOfLines={2}
                  textSize="12"
                  lineHeight={15}
                  textWeight="Regular"
                  textColor={COLOR.GRAY_999}
                />
              </View>
              <FontText
                value={`MM전`}
                textSize="11"
                lineHeight={13}
                textWeight="Medium"
                textColor={COLOR.GRAY_999}
              />
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={<View className="h-64" />}
        ListEmptyComponent={
          <View className="flex-1 pt-250 items-center justify-center gap-17">
            <IconNoNoti />
            {/* TODO: 아이콘 교체 */}
            <TextNoNoti />
          </View>
        }
        showsVerticalScrollIndicator={false}
      ></FlatList>
    </SafeAreaView>
  );
};

export default NotiHistory;
