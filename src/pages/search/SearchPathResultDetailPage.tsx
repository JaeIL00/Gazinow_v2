import { css } from '@emotion/native';
import { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';

import { FontText } from '@/components/common/atoms';
import { IconButton } from '@/components/common/molecules';
import { SearchPathDetailItem } from '@/components/search/organism';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { useRoute } from '@react-navigation/native';
import { SubPath } from '@/types/apis/searchTypes';

const SearchPathResultDetailPage = () => {
  const route = useRoute();
  const freshData: SubPath[] = useMemo(() => {
    const data = route.params as SubPath;
    return Object.values(data).filter((item) => !!item.lanes.length && !!item.subways.length);
  }, [route]);
  console.log(freshData);
  const navigation = useRootNavigation();
  const [isBookmarking, setIsBookmarking] = useState<boolean>(false);
  return (
    <View
      style={css`
        background-color: white;
        flex: 1;
        padding: 0 16px;
      `}
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
          onPress={() => setIsBookmarking((prev) => !prev)}
        />
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
                value="환승 1회"
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
          margin-bottom: 20px;
          margin-top: 22px;
          height: 1px;
          background-color: #ebebeb;
        `}
      />
      <FlatList
        data={freshData}
        keyExtractor={(item) => item.distance + item.sectionTime + ''}
        ListFooterComponent={<View style={{ height: 100 }} />}
        renderItem={({ item, index }) => (
          <SearchPathDetailItem data={item} isLastLane={freshData.length - 1 === index} />
        )}
      />
    </View>
  );
};

export default SearchPathResultDetailPage;
