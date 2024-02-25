import { IssueSummary, StationCode } from '@/global/apis/entity';
import { subwayLineColor } from '@/global/utils';
import { View } from 'react-native';
import IssueKeywordIcon from './IssueKeywordIcon';

interface PathBarProps {
  stationCode: StationCode;
  isFirst?: boolean;
  isLast: boolean;
  issues: IssueSummary[];
}

const PathBar = ({ stationCode, isFirst, isLast, issues }: PathBarProps) => {
  return (
    <View
      style={{
        backgroundColor: subwayLineColor(stationCode),
        height: 3,
        flex: 1,
        marginTop: 7.5,
        marginRight: isLast ? 18 : null,
        marginLeft: isFirst ? 18 : null,
        position: 'relative',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: -31,
          width: '100%',
          justifyContent: issues.length > 1 ? 'space-around' : 'center',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 8,
        }}
      >
        {issues &&
          issues.map((issue, idx) => {
            if (idx > 2) return;
            return (
              <IssueKeywordIcon
                key={issue.id}
                width={24}
                height={24}
                keyword={issue.keyword}
                color={subwayLineColor(stationCode)}
              />
            );
          })}
      </View>
    </View>
  );
};

export default PathBar;
