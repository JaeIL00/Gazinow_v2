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
  const sortedLanes = Array.from(new Set(lanes)).sort();
  return (
    <View className="flex-row pt-16 pb-8">
      {sortedLanes.map((lane: RawSubwayLineName, index) => (
        <View
          key={index}
          className={`rounded-full px-8 py-6 mr-4`}
          style={{ backgroundColor: rawLineNameToNowCapsuleColor(lane) }}
        >
          <FontText
            value={rawLineNameToNowCapsuleText(lane)}
            textSize="12px"
            lineHeight="14.32px"
            textWeight="SemiBold"
            textColor={rawLineNameToColor(lane)}
          />
        </View>
      ))}
    </View>
  );
};
export default LaneCapsulesPerIssue;
