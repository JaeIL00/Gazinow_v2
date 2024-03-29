import { css } from '@emotion/native';
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

  // TODO: 검색 -> 상세경로 진입 시 myPathId 값을 바인딩해야함
  const [myPathId, setMyPathId] = useState<number | null>(resultData.id ?? null);
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
    <SafeAreaView
      style={{
        backgroundColor: COLOR.WHITE,
        flex: 1,
      }}
    >
      <View
        style={{
          paddingHorizontal: 16,
          flex: 1,
        }}
      >
        {/* header */}
        <View
          style={{
            paddingVertical: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
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
                <View
                  style={{
                    position: 'relative',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View
                    style={{
                      backgroundColor: '#00000099',
                      position: 'absolute',
                      top: 0,
                      width: '100%',
                      height: '100%',
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: COLOR.WHITE,
                      paddingTop: 32,
                      paddingBottom: 24,
                      paddingHorizontal: 24,
                      borderRadius: 12,
                      width: '80%',
                    }}
                  >
                    <FontText
                      value={`로그인하면 관심 경로의\n이슈를 알려드려요`}
                      textSize="18px"
                      textWeight="SemiBold"
                      style={{ textAlign: 'center' }}
                    />
                    <View
                      style={{ flexDirection: 'row', width: '100%', columnGap: 8, marginTop: 30 }}
                    >
                      <TextButton
                        value="취소"
                        textSize="14px"
                        textColor={COLOR.GRAY_999}
                        textWeight="SemiBold"
                        onPress={() => setIsSaveRouteModalOpen(false)}
                        style={{
                          flex: 1,
                          borderRadius: 5,
                          borderWidth: 1,
                          borderColor: COLOR.GRAY_999,
                          alignItems: 'center',
                          paddingVertical: 12,
                        }}
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
                        style={{
                          flex: 1,
                          borderRadius: 5,
                          alignItems: 'center',
                          paddingVertical: 12,
                          backgroundColor: COLOR.BASIC_BLACK,
                        }}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            ))}
        </View>
        <View
          style={css`
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding-left: 10px;
          `}
        >
          <View>
            <FontText value="평균 소요시간" textSize="13px" textWeight="Medium" textColor="#999" />
            <View
              style={css`
                flex-direction: row;
                margin-top: 2px;
              `}
            >
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
                <View
                  style={css`
                    flex: 1;
                  `}
                />
                <FontText
                  value={
                    freshSubPathData.length - 1 === 0
                      ? '환승없음'
                      : '환승 ' + (freshSubPathData.length - 1) + '회'
                  }
                  textSize="16px"
                  textWeight="Regular"
                  textColor="#999"
                  style={{ marginBottom: 2 }}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={css`
            margin-bottom: 21px;
            margin-top: 16px;
            height: 1px;
            background-color: ${COLOR.GRAY_EB};
          `}
        />

        <FlatList
          data={freshSubPathData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => {
            if (typeof item === 'string') return 'dance';
            return item.distance + item.sectionTime + '';
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
