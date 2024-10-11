import { FontText } from '@/global/ui';
import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import IconLeftArrowHead from '@assets/icons/left_arrow_head.svg';
import IconNoNoti from '@assets/icons/no_result_icon.svg';
import TextNoNoti from '@/assets/icons/no_notihistory_text.svg';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { COLOR } from '@/global/constants';
import { useAppDispatch } from '@/store';
import { getIssueId } from '@/store/modules';
import IssueKeywordIcon from '@/global/components/IssueKeywordIcon';
import SettingsIcon from '@/assets/icons/icon_setting.svg';

const NotiHistory = () => {
  const navigation = useRootNavigation();
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between p-16">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconLeftArrowHead color="#3F3F46" width={24} />
        </TouchableOpacity>

        <FontText text="알림" className="text-18 leading-23" fontWeight="500" />

        <TouchableOpacity
          onPress={() => navigation.push('MyPageNavigation', { screen: 'NotiSettingsScreen' })}
          hitSlop={20}
        >
          <SettingsIcon />
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
              className="flex-row px-16 py-20 border-b-1 border-gray-beb"
            >
              {/* TODO: 아이콘, 알림 내용, 시간 바꾸기 */}
              {/* TODO: 읽은 알림은 회색으로 */}
              {/* <IssueKeywordIcon keyword={item.keyword} color={'black'} width={24} height={24} /> */}
              <IssueKeywordIcon keyword={'자연재해'} color="black" width={24} height={24} />
              <View className="flex-1 ml-12 mr-32">
                <FontText
                  text={`출근길 경로에 [${item}] 이슈가 생겼어요`}
                  className="text-14 leading-21"
                  numberOfLines={2}
                  fontWeight="600"
                />
                <View className="h-4" />
                <FontText
                  text={`4호선 신용산역-사당역 방면`}
                  className="text-12 leading-15 text-gray-999"
                  numberOfLines={2}
                />
              </View>
              <FontText
                text={`MM전`}
                className="text-11 leading-13 text-gray-999"
                fontWeight="500"
              />
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={<View className="h-64" />}
        ListEmptyComponent={
          <View className="items-center justify-center flex-1 pt-250 gap-17">
            <IconNoNoti />
            <TextNoNoti />
          </View>
        }
        showsVerticalScrollIndicator={false}
      ></FlatList>
    </SafeAreaView>
  );
};

export default NotiHistory;
