import { useMemo, useState } from 'react';
import { FlatList, Modal, SafeAreaView, TouchableOpacity, View } from 'react-native';

import { FontText, Space, TextButton } from '@/global/ui';
import { useRoute } from '@react-navigation/native';
import NewRouteSaveModal from './components/NewRouteSaveModal';
import SearchPathDetailItem from './components/SearchPathDetailItem';
import { useDeleteSavedSubwayRoute } from '@/global/apis/hooks';
import { Path, SubPath } from '@/global/apis/entity';
import { useHomeNavigation } from '@/navigation/HomeNavigation';
import { COLOR } from '@/global/constants';
import { useQueryClient } from 'react-query';
import IconBookmark from '@assets/icons/bookmark.svg';
import IconLeftArrowHead from '@assets/icons/left_arrow_head.svg';
import { useAppSelect } from '@/store';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { showToast } from '@/global/utils/toast';

interface DetailData extends Path {
  id: number;
}

const SearchPathResultDetailScreen = () => {
  const queryClient = useQueryClient();
  const navigation = useHomeNavigation();
  const rootNavigation = useRootNavigation();
  const { state: resultData } = useRoute().params as { state: DetailData };
  const isVerifiedUser = useAppSelect((state) => state.auth.isVerifiedUser);

  const { isLoading, deleteMutate } = useDeleteSavedSubwayRoute({
    onSuccess: async () => {
      await queryClient.invalidateQueries(['getRoads']);
      setIsBookmarking(false);
      showToast('deleteRoute');
    },
  });

  const [myPathId, setMyPathId] = useState<number | null>(
    resultData.id || (resultData.myPathId ? resultData.myPathId[0] : null),
  );
  const [isBookmarking, setIsBookmarking] = useState<boolean>(resultData.myPath ?? !!resultData.id);
  const [isSaveRouteModalOpen, setIsSaveRouteModalOpen] = useState<boolean>(false);

  const freshSubPathData: SubPath[] = useMemo(() => {
    if (!resultData.subPaths) return [];
    const subPaths = resultData.subPaths;
    return Object.values(subPaths).filter((item) => !!item.lanes.length && !!item.stations.length);
  }, [resultData]);

  const bookmarkHandler = () => {
    if (!isBookmarking) {
      setIsSaveRouteModalOpen(true);
      return;
    } else if (myPathId) {
      deleteMutate({ id: myPathId });
    }
  };

  const isOccurIssue = useMemo(() => {
    return resultData.subPaths.some((item) => item.lanes[0] && !!item.lanes[0].issueSummary.length);
  }, [resultData]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-16">
        {/* header */}
        <View className="flex-row items-center justify-between py-16">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconLeftArrowHead color="#3F3F46" width={18} height={18} />
          </TouchableOpacity>
          <TouchableOpacity onPress={bookmarkHandler} disabled={isLoading}>
            <IconBookmark
              width={24}
              height={24}
              stroke={isBookmarking ? 'none' : COLOR.GRAY_999}
              strokeWidth={2}
              fill={isBookmarking ? COLOR.LIGHT_BLUE : 'transparent'}
            />
          </TouchableOpacity>
          {isSaveRouteModalOpen &&
            (isVerifiedUser === 'success auth' ? (
              <NewRouteSaveModal
                freshData={{ ...resultData, subPaths: freshSubPathData }}
                closeModal={() => setIsSaveRouteModalOpen(false)}
                onBookmark={() => setIsBookmarking(true)}
                setMyPathId={(id: number) => setMyPathId(id)}
              />
            ) : (
              <Modal visible onRequestClose={() => setIsSaveRouteModalOpen(false)} transparent>
                <View className="relative items-center justify-center flex-1">
                  <View className="bg-[#00000099] absolute top-0 w-full h-full" />
                  <View className="absolute w-4/5 px-24 pt-32 pb-24 bg-white rounded-12">
                    <FontText
                      value={`로그인하면 관심 경로의\n이슈를 알려드려요`}
                      textSize="18px"
                      textWeight="SemiBold"
                      className="text-center"
                    />
                    <View className="flex-row w-full gap-x-8 mt-30">
                      <TextButton
                        value="취소"
                        textSize="14px"
                        textColor={COLOR.GRAY_999}
                        textWeight="SemiBold"
                        onPress={() => setIsSaveRouteModalOpen(false)}
                        className="items-center flex-1 py-12 border rounded-5 border-gray-99"
                      />
                      <TextButton
                        value="로그인"
                        textSize="14px"
                        textColor={COLOR.WHITE}
                        textWeight="SemiBold"
                        onPress={() => {
                          setIsSaveRouteModalOpen(false);
                          rootNavigation.navigate('AuthStack', { screen: 'Landing' });
                        }}
                        className="items-center flex-1 py-12 rounded-5 bg-black-17"
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            ))}
        </View>

        <View className="flex-row items-center justify-between pl-10">
          <View>
            <FontText value="평균 소요시간" textSize="13px" textWeight="Medium" textColor="#999" />
            <View className="flex-row mt-2">
              <FontText
                value={
                  resultData.totalTime > 60
                    ? Math.floor(resultData.totalTime / 60) +
                      '시간 ' +
                      (resultData.totalTime % 60) +
                      `분 ${isOccurIssue ? '이상' : ''}`
                    : resultData.totalTime + `분 ${isOccurIssue ? '이상' : ''}`
                }
                textSize="28px"
                textWeight="Bold"
              />

              <Space width="8px" />

              <View>
                <View className="flex-1" />
                <FontText
                  value={
                    freshSubPathData.length - 1 === 0
                      ? '환승없음'
                      : '환승 ' + (freshSubPathData.length - 1) + '회'
                  }
                  textSize="16px"
                  textWeight="Regular"
                  textColor="#999"
                  className="mb-2"
                />
              </View>
            </View>
          </View>
        </View>

        {/* 경계선 */}
        <View className="h-px mt-16 mb-21 bg-gray-eb" />

        <FlatList
          data={freshSubPathData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => {
            if (typeof item === 'string') return 'dance';
            return item.distance + 'detail' + item.sectionTime;
          }}
          renderItem={({ item, index }) => {
            return (
              <SearchPathDetailItem
                data={item}
                isLastLane={freshSubPathData.length - 1 === index}
                lineLength={freshSubPathData.length}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchPathResultDetailScreen;
