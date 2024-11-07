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
    <SafeAreaView className="flex-1 bg-gray-9f9">
      <TouchableOpacity className="flex-row items-center p-16" onPress={() => navigation.goBack()}>
        <IconLeftArrowHead color="#3F3F46" width={24} style={{ marginRight: 12 }} />
        <FontText text="저장경로 편집" className="text-18" fontWeight="500" />
      </TouchableOpacity>

      <ScrollView>
        <View className="mx-16 bg-white rounded-15">
          <SavedRoutesList />
          <TouchableOpacity
            className="flex-row items-center justify-center py-20"
            onPress={() => newRouteNavigation.navigate('Swap')}
          >
            <IconPlusBtn />
            <View className="w-6" />
            <FontText
              text="경로 추가하기"
              className="text-14 leading-21 text-gray-999"
              fontWeight="500"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedRoutesScreen;
