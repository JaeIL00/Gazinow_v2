import { css } from '@emotion/native';
import { useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, View } from 'react-native';

import { FontText, IconButton } from '@/global/ui';
import { useRoute } from '@react-navigation/native';
import NewRouteSaveModal from './components/NewRouteSaveModal';
import SearchPathDetailItem from './components/SearchPathDetailItem';
import { useDeleteSavedSubwayRoute } from '@/global/apis/hook';
import { Path, SubPath } from '@/global/apis/entity';
import { useHomeNavigation } from '@/navigation/HomeNavigation';
import { COLOR } from '@/global/constants';
import { useQueryClient } from 'react-query';

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

  const [isBookmarking, setIsBookmarking] = useState<boolean>(resultData.myPath);
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
    if (isBookmarking && !!resultData.myPathId) {
      deleteMutate({ id: resultData.myPathId[0] });
    } else {
      setIsSaveRouteModalOpen(true);
    }
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLOR.WHITE,
        flex: 1,
      }}
    >
      <StatusBar backgroundColor={COLOR.WHITE} barStyle="dark-content" />
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
          <IconButton
            isFontIcon={true}
            iconType="Feather"
            iconName="chevron-left"
            iconColor="#3F3F46"
            iconWidth="24"
            onPress={() => navigation.goBack()}
          />
          <IconButton
            iconType="FontAwesome"
            isFontIcon={true}
            iconName={isBookmarking ? 'bookmark' : 'bookmark-o'}
            iconWidth="24"
            iconColor={isBookmarking ? '#346BF7' : '#999'}
            onPress={bookmarkHandler}
          />
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
                      '분'
                    : resultData.totalTime + '분 이상'
                }
                textSize="24px"
                textWeight="Bold"
                lineHeight="32px"
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
