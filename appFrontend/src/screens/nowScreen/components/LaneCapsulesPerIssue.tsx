import React from 'react';
import { FontText } from '@/global/ui';
import { RawSubwayLineName } from '@/global/apis/entity';
import { View } from 'react-native';
import {
  rawLineNameToNowCapsuleText,
  rawLineNameToNowCapsuleColor,
  rawLineNameToColor,
} from '@/global/utils/subwayLine';

interface LaneCapsulesProps {
  lanes: RawSubwayLineName[];
}

const LaneCapsulesPerIssue = ({ lanes }: LaneCapsulesProps) => {
  const uniqueLanes = Array.from(new Set(lanes)).sort();
  return (
    <View style={{ flexDirection: 'row', padding: 16, paddingBottom: 8 }}>
      {uniqueLanes.map((lane: RawSubwayLineName, index) => (
        <View
          key={index}
          style={{
            borderRadius: 999,
            backgroundColor: rawLineNameToNowCapsuleColor(lane),
            paddingHorizontal: 8,
            paddingVertical: 6,
            marginRight: 4,
          }}
        >
          <FontText
            value={rawLineNameToNowCapsuleText(lane)}
            textSize="12px"
            lineHeight={14.32}
            textWeight="SemiBold"
            textColor={rawLineNameToColor(lane)}
          />
        </View>
      ))}
    </View>
  );
};
export default LaneCapsulesPerIssue;
