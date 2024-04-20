import React from 'react';
import SavedRoutesList from './components/SavedRoutesList';
import { FontText } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import IconPlusBtn from '@assets/icons/plus_circle.svg';
import IconLeftArrowHead from '@assets/icons/left_arrow_head.svg';
import { useNewRouteNavigation } from '@/navigation/NewRouteNavigation';

const SavedRoutesScreen = () => {
  const navigation = useRootNavigation();
  const newRouteNavigation = useNewRouteNavigation();

  return (
    <SafeAreaView className="flex-1 px-16 bg-gray-f9">
      <TouchableOpacity
        className="flex-row py-16 items-center gap-12"
        onPress={() => navigation.goBack()}
      >
        <IconLeftArrowHead color="#3F3F46" width={24} />
        <FontText value="저장경로 편집" textSize="18px" textWeight="Medium" lineHeight="23px" />
      </TouchableOpacity>

      <ScrollView>
        <View className="rounded-15 bg-white">
          <SavedRoutesList />
          <TouchableOpacity
            className="flex-row py-20 items-center justify-center gap-6"
            onPress={() => newRouteNavigation.navigate('Swap')}
          >
            <IconPlusBtn />
            <FontText
              value="경로 추가하기"
              textSize="14px"
              textWeight="Medium"
              lineHeight="21px"
              textColor={COLOR.GRAY_999}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedRoutesScreen;
