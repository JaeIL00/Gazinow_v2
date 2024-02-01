import { css } from '@emotion/native';
import { useState } from 'react';
import { Image, View } from 'react-native';

import { iconPath } from '@/assets/icons/iconPath';
import { FontText, IconButton } from '@/global/ui';
import { subwayLineColor, subwayNameCutting } from '@/global/utils';
import { SubPath } from '@/global/apis/entity';

interface SearchPathDetailItemProps {
  data: SubPath;
  isLastLane: boolean;
}

const SearchPathDetailItem = ({ data, isLastLane }: SearchPathDetailItemProps) => {
  const [isOpenPathList, setIsOpenPathList] = useState<boolean>(false);
  const lastIdx = data.subways.length - 1;
  return (
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
              background-color: ${subwayLineColor(data.lanes[0].StationCode)};
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
              background-color: ${subwayLineColor(data.lanes[0].StationCode)};
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
            value={subwayNameCutting(data.subways[0].stationName.replace('역', ''))}
            textSize="14px"
            textWeight="SemiBold"
            lineHeight="21px"
            textColor={subwayLineColor(data.lanes[0].StationCode)}
          />
          <View
            style={css`
              flex-direction: row;
            `}
          >
            <FontText
              value={' | '} // 백엔드: 지하철 방향
              textSize="11px"
              textWeight="Medium"
              lineHeight="13px"
              textColor="#999"
            />
            <FontText
              value={'빠른환승'} // 백엔드: 빠른환승 문 번호
              textSize="11px"
              textWeight="Medium"
              lineHeight="13px"
              textColor="#999"
            />
          </View>

          {/* 이슈박스 */}
          <View
            style={{
              height: 54,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: 'rgba(0, 0, 0, 0.06)',
              marginVertical: 8,
            }}
          />

          <View
            style={css`
              flex-direction: row;
              align-items: center;
            `}
          >
            <FontText
              value={data.stationCount + 1 + '개역 (' + data.sectionTime + '분)'}
              textSize="11px"
              textWeight="Medium"
              lineHeight="13px"
              textColor="#49454f"
            />
            <View
              style={css`
                width: 4px;
              `}
            />
            <IconButton
              isFontIcon={true}
              iconType="Feather"
              iconName={isOpenPathList ? 'chevron-up' : 'chevron-down'}
              iconColor="#49454f"
              iconWidth="10"
              onPress={() => setIsOpenPathList((prev) => !prev)}
            />
          </View>
          {isOpenPathList && (
            <View style={{ marginTop: 12 }}>
              {data.subways.map((item, idx) => (
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
                      backgroundColor: '#fff',
                      borderColor: subwayLineColor(data.lanes[0].StationCode),
                      borderRadius: 12,
                    }}
                  />
                  <FontText
                    value={item.stationName}
                    textSize="11px"
                    textWeight="Medium"
                    lineHeight="13px"
                    textColor="#49454f"
                  />
                </View>
              ))}
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
            background-color: ${subwayLineColor(data.lanes[0].StationCode)};
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
            value={subwayNameCutting(data.subways[lastIdx].stationName.replace('역', ''))}
            textSize="14px"
            textWeight="SemiBold"
            lineHeight="21px"
            textColor={subwayLineColor(data.lanes[0].StationCode)}
          />
          <FontText
            value={'내리는 문: '} // 백엔드: 내리는문 좌우
            textSize="11px"
            textWeight="Medium"
            lineHeight="13px"
            textColor="#999"
          />
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
          <Image source={iconPath.walk_human_gray} style={{ width: 24, height: 24 }} />
          <View
            style={css`
              overflow: hidden;
            `}
          >
            <View
              style={{
                marginLeft: 10,
                borderLeftWidth: 6,
                height: 60,
                zIndex: -1,
                borderColor: '#999',
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default SearchPathDetailItem;
