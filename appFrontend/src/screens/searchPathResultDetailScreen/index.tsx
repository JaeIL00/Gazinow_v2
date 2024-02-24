import { css } from '@emotion/native';
import { useMemo, useState } from 'react';
import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';

import { FontText } from '@/global/ui';
import { useRoute } from '@react-navigation/native';
import NewRouteSaveModal from './components/NewRouteSaveModal';
import SearchPathDetailItem from './components/SearchPathDetailItem';
import { useDeleteSavedSubwayRoute } from '@/global/apis/hook';
import { Path, SubPath } from '@/global/apis/entity';
import { useHomeNavigation } from '@/navigation/HomeNavigation';
import { COLOR } from '@/global/constants';
import { useQueryClient } from 'react-query';
import IconBookmark from '@assets/icons/bookmark.svg';
import IconLeftArrowHead from '@assets/icons/left_arrow_head.svg';

const SearchPathResultDetailScreen = () => {
  const queryClient = useQueryClient();
  const navigation = useHomeNavigation();
  const { state: resultData } = useRoute().params as { state: Path };

  const { deleteMutate } = useDeleteSavedSubwayRoute({
    onSuccess: async () => {
      await queryClient.invalidateQueries(['getRoads']);
      setIsBookmarking(false);
    },
  });

  const [isBookmarking, setIsBookmarking] = useState<boolean>(resultData.myPath ?? false);
  const [isSaveRouteModalOpen, setIsSaveRouteModalOpen] = useState<boolean>(false);

  const freshSubPathData: SubPath[] = useMemo(() => {
    if (!resultData.subPaths) return [];
    const subPaths = resultData.subPaths;
    return Object.values(subPaths).filter((item) => !!item.lanes.length && !!item.stations.length);
  }, [resultData]);

  const transferCount = useMemo(() => {
    return freshSubPathData.length <= 1 ? freshSubPathData.length : freshSubPathData.length - 1;
  }, [freshSubPathData]);

  const bookmarkHandler = () => {
    // FIXME: 저장 후 경로 목록을 refetch하지 않는 이상 저장한 경로 아이디를 알 수 없음
    if (isBookmarking && !!resultData.myPathId) {
      deleteMutate({ id: resultData.myPathId[0] });
    } else {
      setIsSaveRouteModalOpen(true);
    }
  };

  const isOccurIssue = resultData.subPaths.some(
    (item) => item.lanes[0] && !!item.lanes[0].issueSummary.length,
  );

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
            <IconLeftArrowHead width={18} height={18} />
          </TouchableOpacity>
          <TouchableOpacity onPress={bookmarkHandler}>
            <IconBookmark
              width={24}
              height={24}
              stroke={isBookmarking ? 'none' : COLOR.GRAY_999}
              strokeWidth={2}
              fill={isBookmarking ? COLOR.LIGHT_BLUE : 'transparent'}
            />
          </TouchableOpacity>
          {isSaveRouteModalOpen && (
            <NewRouteSaveModal
              freshData={{ ...resultData, subPaths: freshSubPathData }}
              closeModal={() => setIsSaveRouteModalOpen(false)}
              onBookmark={() => setIsBookmarking(true)}
            />
          )}
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
            <FontText
              value="평균 소요시간"
              textSize="12px"
              textWeight="Medium"
              lineHeight="14px"
              textColor="#999"
            />
            <View
              style={css`
                flex-direction: row;
                margin-top: 4px;
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
                textSize="24px"
                textWeight="Bold"
              />
              <View
                style={css`
                  width: 8px;
                `}
              />
              <View>
                <View
                  style={css`
                    flex: 1;
                  `}
                />
                <FontText
                  value={'환승 ' + transferCount + '회'}
                  textSize="14px"
                  textWeight="Regular"
                  lineHeight="21px"
                  textColor="#999"
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
          keyExtractor={(item) => item.distance + item.sectionTime + ''}
          ListFooterComponent={<View style={{ height: 100 }} />}
          renderItem={({ item, index }) => (
            <SearchPathDetailItem data={item} isLastLane={freshSubPathData.length - 1 === index} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchPathResultDetailScreen;
