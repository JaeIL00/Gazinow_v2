import { css } from '@emotion/native';
import { useState } from 'react';
import { Image, View } from 'react-native';

import { iconPath } from '@/assets/icons/iconPath';
import { FontText } from '@/components/common/atoms';
import { IconButton } from '@/components/common/molecules';

interface SearchPathDetailItemProps {
  detailData: {
    line: string;
    time: string;
    departure: {
      name: string;
      arrow: string;
      fast: string;
      path: {
        line: string;
        name: string;
      }[];
    };
    arrive: {
      name: string;
      door: string;
      trans: string | null;
    };
  };
}

const SearchPathDetailItem = ({ detailData }: SearchPathDetailItemProps) => {
  const [isOpenPathList, setIsOpenPathList] = useState<boolean>(false);

  return (
    <View
      key={detailData.arrive.door}
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
              background-color: #49afef;
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
              background-color: #49afef;
            `}
          />
        </View>
        <View
          style={css`
            margin-left: 14px;
          `}
        >
          <FontText
            value={detailData.departure.name}
            textSize="14px"
            textWeight="SemiBold"
            lineHeight="21px"
            textColor="#49AFEF"
          />
          <View
            style={css`
              flex-direction: row;
            `}
          >
            <FontText
              value={detailData.departure.arrow + ' | '}
              textSize="11px"
              textWeight="Medium"
              lineHeight="13px"
              textColor="#999"
            />
            <FontText
              value={'빠른환승' + detailData.departure.fast}
              textSize="11px"
              textWeight="Medium"
              lineHeight="13px"
              textColor="#999"
            />
          </View>
          <View
            style={css`
              flex-direction: row;
              align-items: center;
              margin-top: 8px;
            `}
          >
            <FontText
              value={detailData.departure.path.length + '개역 (' + detailData.time + ')'}
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
            background-color: #49afef;
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
            value={detailData.arrive.name}
            textSize="14px"
            textWeight="SemiBold"
            lineHeight="21px"
            textColor="#49AFEF"
          />
          <FontText
            value={'내리는 문: ' + detailData.arrive.door}
            textSize="11px"
            textWeight="Medium"
            lineHeight="13px"
            textColor="#999"
          />
        </View>
      </View>
      {detailData.arrive.trans && (
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
            {/* 대쉬 보더가 촘촘히해야함 */}
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
