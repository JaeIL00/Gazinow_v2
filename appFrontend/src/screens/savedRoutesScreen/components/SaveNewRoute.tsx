import { FontText, Input } from '@/global/ui';
import { COLOR } from '@/global/constants';
import React, { useEffect, useMemo, useState } from 'react';
import { useSavedSubwayRoute } from '@/global/apis/hooks';
import { useQueryClient } from 'react-query';
import { SubwaySimplePath } from '@/global/components';
import { Path, SubPath } from '@/global/apis/entity';
import { View, Keyboard, SafeAreaView, TouchableOpacity } from 'react-native';
import { KeyboardAvoidingView, Platform } from 'react-native';
import XCircle from '@assets/icons/x-circle-standard.svg';
import AddNewRouteHeader from './AddNewRouteHeader';
import { useRoute } from '@react-navigation/native';
import { useHomeNavigation } from '@/navigation/HomeNavigation';
import { showToast } from '@/global/utils/toast';
import cn from 'classname';

const SaveNewRoute = () => {
  const { state: resultData } = useRoute().params as { state: Path };
  const homeNavigation = useHomeNavigation();
  const queryClient = useQueryClient();

  const [roadName, setRoadName] = useState<string>('');
  const [isDuplicatedName, setIsDuplicatedName] = useState<boolean>(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const freshSubPathData: SubPath[] = useMemo(() => {
    const subPaths = resultData?.subPaths || [];
    return subPaths.filter((subPath) => !!subPath.lanes.length && !!subPath.stations.length);
  }, [resultData]);

  const { mutate, isLoading } = useSavedSubwayRoute({
    onSuccess: async () => {
      await queryClient.invalidateQueries('getRoads');
      homeNavigation.navigate('SavedRoutes');
      showToast('saveRoute');
    },
    onError: async (error: any) => {
      if (error.response.status === 409) {
        setIsDuplicatedName(true);
      }
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 bg-white">
        <AddNewRouteHeader />
        <View className="flex-1 px-16 bg-white">
          <View className="mt-32 mx-33 mb-22">
            <SubwaySimplePath
              pathData={freshSubPathData}
              arriveStationName={resultData.lastEndStation}
              betweenPathMargin={24}
            />
          </View>
          <FontText
            value="새 경로 이름"
            textSize="14px"
            textWeight="Medium"
            lineHeight="21px"
            textColor={COLOR.BASIC_BLACK}
          />
          <Input
            className="px-16 py-12 my-7 rounded-5 bg-gray-f9"
            placeholder="경로 이름을 입력하세요"
            value={roadName}
            onChangeText={(text) => {
              if (text.length > 10) return;
              setRoadName(text);
              setIsDuplicatedName(false);
            }}
            inputMode="email"
            placeholderTextColor={COLOR.GRAY_999}
          />
          <View className="flex-row justify-between">
            {isDuplicatedName ? (
              <View className="flex-row h-14 ml-9 items-center">
                <XCircle width={14} />
                <FontText
                  value={` 이미 존재하는 이름입니다`}
                  textSize="12px"
                  textWeight="Medium"
                  lineHeight="14px"
                  textColor={COLOR.LIGHT_RED}
                />
              </View>
            ) : (
              <View />
            )}
            <FontText
              value={`${roadName?.length ? roadName.length : 0}/10`}
              textSize="12px"
              textWeight="Regular"
              textColor={COLOR.GRAY_999}
              lineHeight="14px"
            />
          </View>
        </View>
        <TouchableOpacity
          className={cn('py-11 items-center', {
            'bg-gray-dd': !roadName || isLoading || isDuplicatedName,
            'bg-black-17': roadName && !isLoading && !isDuplicatedName,
            'mb-41 mx-16 rounded-5': !isKeyboardVisible,
          })}
          onPress={() => {
            mutate({
              roadName: roadName,
              ...resultData,
              subPaths: freshSubPathData,
            });
          }}
          disabled={!roadName || isLoading || isDuplicatedName}
        >
          <FontText value="완료" textSize="17px" textWeight="SemiBold" textColor={COLOR.WHITE} />
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SaveNewRoute;
