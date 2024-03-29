import { css } from '@emotion/native';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { FontText, Space } from '@/global/ui';
import { subwayLineColor } from '@/global/utils';
import { SubPath } from '@/global/apis/entity';
import { COLOR } from '@/global/constants';
import IconWalkHuman from '@assets/icons/walk_human.svg';

import IconRightArrowHead from '@assets/icons/right_arrow_head.svg';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { useAppDispatch } from '@/store';
import { getIssueId } from '@/store/modules';
import IconDownArrowHead from '@assets/icons/down_arrow_head.svg';
import IssueKeywordIcon from '@/global/components/subwaySimplePath/IssueKeywordIcon';

interface SearchPathDetailItemProps {
  data: SubPath;
  isLastLane: boolean;
  lineLength: number;
}

const SearchPathDetailItem = ({ data, isLastLane, lineLength }: SearchPathDetailItemProps) => {
  const navigation = useRootNavigation();
  const dispatch = useAppDispatch();

  const [isOpenPathList, setIsOpenPathList] = useState<boolean>(false);
  const lastIdx = data.stations.length - 1;

  return (
    <View>
      <View
        style={css`
          margin-left: 31px;
        `}
      >
        {/* 출발역 */}
        <View
          style={css`
            flex-direction: row;
            margin-bottom: 20px;
          `}
        >
          <View>
            <View
              style={css`
                width: 24px;
                height: 24px;
                background-color: ${subwayLineColor(data.lanes[0].stationCode)};
                border-radius: 24px;
              `}
            />
            <View
              style={css`
                width: 6px;
                flex: 1;
                margin-left: 9px;
                margin-top: -10px;
                margin-bottom: -30px;
                background-color: ${subwayLineColor(data.lanes[0].stationCode)};
              `}
            />
          </View>
          <View
            style={css`
              margin-left: 14px;
              flex: 1;
            `}
          >
            <FontText
              value={data.stations[0].stationName}
              textSize="18px"
              textWeight="SemiBold"
              textColor={subwayLineColor(data.lanes[0].stationCode)}
            />
            <View
              style={css`
                flex-direction: row;
                margin-bottom: 8px;
              `}
            >
              <FontText
                value={data.way + ' 방향'}
                textSize="13px"
                textWeight="Regular"
                textColor={COLOR.GRAY_999}
              />
              <FontText
                value={data.door !== 'null' ? ' | 빠른환승 ' + data.door : ''}
                textSize="13px"
                textWeight="Regular"
                textColor={COLOR.GRAY_999}
              />
            </View>

            {/* 이슈박스 */}
            {!!data.lanes[0].issueSummary.length &&
              data.lanes[0].issueSummary.map((issue) => (
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.06)',
                    backgroundColor: COLOR.WHITE,
                    paddingTop: 10,
                    paddingBottom: 12,
                    paddingLeft: 12,
                    paddingRight: 10,
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    dispatch(getIssueId(issue.id));
                    navigation.navigate('IssueStack', { screen: 'IssueDetail' });
                  }}
                >
                  <View
                    style={{
                      marginTop: 2,
                      marginRight: 8,
                    }}
                  >
                    <IssueKeywordIcon
                      width={22}
                      height={22}
                      keyword={issue.keyword}
                      color={subwayLineColor(data.lanes[0].stationCode)}
                    />
                  </View>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <FontText
                      value={issue.title}
                      textSize="13px"
                      textWeight="SemiBold"
                      textColor={COLOR.BASIC_BLACK}
                      numberOfLines={1}
                      style={{ marginBottom: 2 }}
                    />
                    <FontText
                      value={`도움돼요 ${issue.likeCount}개`}
                      textSize="11px"
                      textWeight="Medium"
                      textColor={COLOR.GRAY_999}
                    />
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <IconRightArrowHead style={{ marginBottom: 2 }} color={COLOR.GRAY_999} />
                  </View>
                </TouchableOpacity>
              ))}

            <TouchableOpacity
              style={{
                marginTop: !!data.lanes[0].issueSummary.length ? 8 : 0,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              activeOpacity={1}
              onPress={() => setIsOpenPathList((prev) => !prev)}
              disabled={data.stations.length < 3}
              hitSlop={20}
            >
              <FontText
                value={
                  data.sectionTime > 60
                    ? data.stationCount +
                      '개역 (' +
                      Math.floor(data.sectionTime / 60) +
                      '시간 ' +
                      (data.sectionTime % 60) +
                      '분)'
                    : data.stationCount + '개역 (' + data.sectionTime + '분)'
                }
                textSize="13px"
                textWeight="Regular"
                textColor="#49454f"
              />
              {data.stations.length > 2 && (
                <>
                  <Space width="4px" />
                  <IconDownArrowHead width={10} height={10} rotation={isOpenPathList ? 180 : 0} />
                </>
              )}
            </TouchableOpacity>
            {isOpenPathList && (
              <View style={{ marginTop: 12 }}>
                {data.stations.map((item, idx) => {
                  if (data.stations.length - 1 > idx && idx !== 0) {
                    return (
                      <View
                        key={item.stationName.length + item.stationName}
                        style={{
                          flexDirection: 'row',
                          marginLeft: -32,
                          marginTop: idx !== 0 ? 9 : null,
                        }}
                      >
                        <View
                          style={{
                            width: 12,
                            height: 12,
                            marginRight: 20,
                            borderWidth: 2,
                            backgroundColor: COLOR.WHITE,
                            borderColor: subwayLineColor(data.lanes[0].stationCode),
                            borderRadius: 12,
                          }}
                        />
                        <FontText
                          value={item.stationName}
                          textSize="13px"
                          textWeight="Regular"
                          textColor={COLOR.GRAY_999}
                        />
                      </View>
                    );
                  }
                })}
              </View>
            )}
            {/* 이슈 박스 */}
          </View>
        </View>
        {/* 도착역 */}
        <View
          style={css`
            flex-direction: row;
            z-index: 9999;
          `}
        >
          <View
            style={css`
              width: 24px;
              height: 24px;
              background-color: ${subwayLineColor(data.lanes[0].stationCode)};
              border-radius: 24px;
            `}
          />
          <View
            style={css`
              margin-top: 2px;
              margin-left: 14px;
            `}
          >
            <FontText
              value={data.stations[lastIdx].stationName}
              textSize="18px"
              textWeight="SemiBold"
              textColor={subwayLineColor(data.lanes[0].stationCode)}
            />
            {/* 외부에서 내리는문 데이터를 얻을 수 없음 */}
            {/* <FontText
            value={'내리는 문: '} // 백엔드: 내리는문 좌우
            textSize="11px"
            textWeight="Medium"
            lineHeight="13px"
            textColor={COLOR.GRAY_999}
          /> */}
          </View>
        </View>
        {!isLastLane && (
          <View
            style={css`
              margin-top: -20px;
              margin-left: -25px;
              flex-direction: row;
              align-items: center;
            `}
          >
            <View style={{ marginTop: 10 }}>
              <IconWalkHuman width={24} height={24} />
            </View>
            <View
              style={css`
                overflow: hidden;
              `}
            >
              <View
                style={{
                  marginLeft: 10,
                  borderLeftWidth: 4,
                  height: 60,
                  zIndex: -1,
                  borderColor: COLOR.GRAY_DDD,
                  borderRadius: 0,
                }}
              />
            </View>
          </View>
        )}
        {isLastLane && (
          <View
            style={{
              paddingTop: lineLength > 1 ? '60%' : '100%',
              alignItems: 'center',
              paddingBottom: 24,
              paddingRight: 31,
            }}
          >
            <FontText
              value="powered by www.ODsay.com"
              textSize="10px"
              textWeight="Regular"
              textColor={COLOR.GRAY_DDD}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchPathDetailItem;
