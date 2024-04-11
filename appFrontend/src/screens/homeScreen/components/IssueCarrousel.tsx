import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useGetPopularIssuesQuery } from '@/global/apis/hooks';
import IssueKeywordIcon from '@/global/components/IssueKeywordIcon';
import { COLOR } from '@/global/constants';
import { FontText } from '@/global/ui';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { useAppDispatch } from '@/store';
import { getIssueId } from '@/store/modules';
import dayjs from 'dayjs';
import { subwayLineColor } from '@/global/utils';

const IssueCarrousel = () => {
  const navigation = useRootNavigation();
  const dispatch = useAppDispatch();
  const { popularIssues } = useGetPopularIssuesQuery();
  const [itemWidth, setItemWidth] = useState<number>(0);

  if (!popularIssues) return null;
  return (
    <View style={{ backgroundColor: COLOR.WHITE, borderRadius: 12 }}>
      <ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={200}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: `${100 * popularIssues.length}%` }}
        onContentSizeChange={(width) => setItemWidth(width / popularIssues.length)}
      >
        <View style={{ flexDirection: 'row' }}>
          {popularIssues.map((issue, index: number) => (
            <View style={{ width: itemWidth }}>
              <TouchableOpacity
                style={{
                  padding: 16,
                  flex: 1,
                  justifyContent: 'center',
                  overflow: 'scroll',
                }}
                onPress={() => {
                  dispatch(getIssueId(issue.id));
                  navigation.navigate('IssueStack', { screen: 'IssueDetail' });
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ marginRight: 14 }}>
                    <IssueKeywordIcon
                      width={30}
                      height={30}
                      keyword={issue.keyword}
                      color={subwayLineColor(issue?.lines[0])} //FIXME: 여러 호선에 걸친 이슈인 경우?
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <FontText
                      value={issue.title}
                      textSize="13px"
                      lineHeight="19px"
                      textWeight="SemiBold"
                      textColor={COLOR.BASIC_BLACK}
                      numberOfLines={1}
                    />
                    <FontText
                      value={dayjs(issue.startDate).fromNow()}
                      textSize="11px"
                      lineHeight="13px"
                      textWeight="Medium"
                      textColor={COLOR.GRAY_999}
                    />
                  </View>

                  <View style={{ alignItems: 'flex-end', marginLeft: 16 }}>
                    <FontText
                      value="NOW"
                      textSize="12px"
                      lineHeight="14px"
                      textWeight="Bold"
                      textColor="#346BF7"
                    />
                    <View
                      style={{
                        backgroundColor: '#F3F3F3',
                        borderRadius: 27,
                        width: 36,
                        height: 16,
                        marginTop: 4,
                      }}
                    >
                      <FontText
                        value={`${index + 1}/${popularIssues.length}`}
                        textSize="11px"
                        textWeight="Medium"
                        textColor="#B4B4B4"
                        textAlign="center"
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default IssueCarrousel;
