import { css } from '@emotion/native';
import { useMemo } from 'react';
import { FlatList, Pressable, SafeAreaView, View } from 'react-native';
import { FontText } from '@/global/ui';
import { Path, SubPath } from '@/global/apis/entity';
import SearchPathDetailItem from '@/screens/searchPathResultDetailScreen/components/SearchPathDetailItem';
import { COLOR } from '@/global/constants';
import IconLeftArrowHead from '@assets/icons/left_arrow_head.svg';
import { useNewRouteNavigation } from '@/navigation/NewRouteNavigation';
import { useRoute } from '@react-navigation/native';

const NewRouteDetailModal = () => {
  const newRouteNavigation = useNewRouteNavigation();
  const { state: resultData } = useRoute().params as { state: Path };

  const freshSubPathData: SubPath[] = useMemo(() => {
    if (!resultData.subPaths) return [];
    const subPaths = resultData.subPaths;
    return Object.values(subPaths).filter((item) => !!item.lanes.length && !!item.stations.length);
  }, [resultData]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.WHITE, paddingHorizontal: 16 }}>
      {/* header */}
      <View
        style={{
          paddingVertical: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Pressable hitSlop={20} onPress={() => newRouteNavigation.goBack()}>
          <IconLeftArrowHead style={{ paddingLeft: 8 }} />
        </Pressable>
      </View>
      <View
        style={css`
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
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
                  : resultData.totalTime + '분'
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
                value={`환승 ${freshSubPathData.length - 1}회`}
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
    </SafeAreaView>
  );
};

export default NewRouteDetailModal;
