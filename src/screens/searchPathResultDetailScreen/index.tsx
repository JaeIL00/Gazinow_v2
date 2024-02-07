import { css } from '@emotion/native';
import { useMemo, useState } from 'react';
import { FlatList, Platform, SafeAreaView, StatusBar, View } from 'react-native';

import { FontText, IconButton } from '@/global/ui';
import { useRoute } from '@react-navigation/native';
import NewRouteSaveModal from './components/NewRouteSaveModal';
import SearchPathDetailItem from './components/SearchPathDetailItem';
import { useDeleteSavedSubwayRoute } from '@/global/apis/hook';
import { Path, SubPath } from '@/global/apis/entity';
import { useHomeNavigation } from '@/navigation/HomeNavigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { COLOR } from '@/global/constants';

const SearchPathResultDetailScreen = () => {
  const route = useRoute();
  const navigation = useHomeNavigation();

  const statusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : (StatusBar.currentHeight as number);

  const { deleteMutate } = useDeleteSavedSubwayRoute({
    onSuccess: () => {
      setIsBookmarking(false);
    },
  });

  const [isBookmarking, setIsBookmarking] = useState<boolean>(false);
  const [isSaveRouteModalOpen, setIsSaveRouteModalOpen] = useState<boolean>(false);

  const freshSubPathData: SubPath[] = useMemo(() => {
    const { state } = route.params as { state: Path };
    const subPaths = state.subPaths;
    if (!subPaths) return [];
    return Object.values(subPaths).filter((item) => !!item.lanes.length && !!item.stations.length);
  }, [route]);

  const transferCount = useMemo(() => {
    return freshSubPathData.length <= 1 ? freshSubPathData.length : freshSubPathData.length - 1;
  }, [freshSubPathData]);

  const bookmarkHandler = () => {
    if (isBookmarking) {
      deleteMutate({ id: 8 }); // 백엔드: 저장 아이디
    } else {
      setIsSaveRouteModalOpen(true);
    }
  };
  return (
    <View
      style={{
        backgroundColor: COLOR.WHITE,
        paddingHorizontal: 16,
        paddingVertical: Platform.OS === 'ios' ? statusBarHeight : 0,
        height: '100%',
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
            freshData={{ ...(route.params as Path), subPaths: freshSubPathData }}
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
            <FontText value="42분" textSize="24px" textWeight="Bold" lineHeight="32px" />
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
          background-color: #ebebeb;
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
  );
};

export default SearchPathResultDetailScreen;
