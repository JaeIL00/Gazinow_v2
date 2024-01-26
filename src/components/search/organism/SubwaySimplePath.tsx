import { SubPath } from '@/types/apis/searchTypes';
import { View } from 'react-native';
import PathBar from './PathBar';
import PathLineNumName from './PathLineNumName';
import { useMemo } from 'react';

interface SubwaySimplePathProps {
  pathData: SubPath[];
}

const SubwaySimplePath = ({ pathData }: SubwaySimplePathProps) => {
  const freshLanesPathData = useMemo(() => {
    return pathData.filter((item) => !!item.lanes.length && !!item.subways.length);
  }, [pathData]);
  const maxLength = freshLanesPathData.length;

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 18,
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        <View
          style={{
            position: 'absolute',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
          }}
        >
          {/* 지하철 경로 라인, 환승역 3개 이하 */}
          {freshLanesPathData.map(({ lanes }, idx) => {
            const lastItemNeverRender = maxLength - 1 !== idx;
            if (maxLength >= 5 && idx < 2) {
              return <PathBar subwayCode={lanes[0].subwayCode} isLast={1 === idx} />;
            } else if (maxLength < 5 && lastItemNeverRender) {
              return <PathBar subwayCode={lanes[0].subwayCode} isLast={maxLength - 2 === idx} />;
            }
            return <></>;
          })}
        </View>
        {/* 지하철 호선 및 이름, 환승역 3개 이하 */}
        {freshLanesPathData.map(({ subways, lanes }, idx) => {
          if (maxLength >= 5 && idx < 3) {
            return <PathLineNumName lane={lanes[0]} stationName={subways[0].stationName} />;
          } else if (maxLength < 5) {
            return <PathLineNumName lane={lanes[0]} stationName={subways[0].stationName} />;
          }
          return <></>;
        })}
      </View>

      {/* 환승역이 3개 이상일 때 렌더링 */}
      {maxLength >= 5 && (
        <View
          style={{
            marginRight: maxLength === 5 ? 0 : 18,
            position: 'relative',
            width: maxLength === 5 ? '50%' : '100%',
          }}
        >
          {/* 지하철 경로 라인 */}
          <View
            style={{
              position: 'absolute',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            {freshLanesPathData.map(({ lanes }, idx) => (
              <>
                {idx >= 3 && maxLength - 1 !== idx && (
                  <PathBar subwayCode={lanes[0].subwayCode} isFirst={3 === idx} isLast={false} />
                )}
              </>
            ))}
          </View>

          {/* 지하철 호선 및 이름 */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: -21, // 이름 아이템 백그라운드 width값의 절반
            }}
          >
            {freshLanesPathData.map(({ subways, lanes }, idx) => (
              <>
                {idx >= 3 && (
                  <PathLineNumName lane={lanes[0]} stationName={subways[0].stationName} />
                )}
              </>
            ))}
          </View>
        </View>
      )}
    </>
  );
};

export default SubwaySimplePath;
