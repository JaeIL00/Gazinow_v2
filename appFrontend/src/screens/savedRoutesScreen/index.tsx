import React from 'react';
import SavedRoutesList from './components/SavedRoutesList';
import { FontText } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { Pressable, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import IconPlusBtn from '@assets/icons/plus_circle.svg';
import IconLeftArrowHead from '@assets/icons/left_arrow_head.svg';
import { useNewRouteNavigation } from '@/navigation/NewRouteNavigation';

const SavedRoutesScreen = () => {
  const navigation = useRootNavigation();
  const newRouteNavigation = useNewRouteNavigation();

  return (
    <SafeAreaView className="flex-1 bg-gray-9f9">
      <View className="flex-row items-center gap-12 p-16">
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={20}>
          <IconLeftArrowHead width={24} color="#3F3F46" />
        </TouchableOpacity>
        <FontText text="저장경로 편집" className="text-18 leading-23" fontWeight="500" />
      </View>
      <ScrollView>
        <View className="mx-16 bg-white rounded-15">
          <SavedRoutesList />
          <Pressable
            style={({ pressed }) => ({
              backgroundColor: pressed ? COLOR.GRAY_E5 : COLOR.WHITE,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 20,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            })}
            onPress={() => newRouteNavigation.navigate('Swap')}
          >
            <IconPlusBtn />
            <FontText
              text="경로 추가하기"
              className="ml-6 text-14 leading-21 text-gray-999"
              fontWeight="500"
            />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedRoutesScreen;
