import { View } from 'react-native';
import PathBar from './PathBar';
import PathLineNumName from './PathLineNumName';
import { useMemo } from 'react';
import { SubPath } from '@/global/apis/entity';
import React from 'react';

interface SubwaySimplePathProps {
  pathData: SubPath[];
  arriveStationName: string;
  betweenPathMargin: number;
}

const SubwaySimplePath = ({
  pathData,
  arriveStationName,
  betweenPathMargin,
}: SubwaySimplePathProps) => {
  const freshLanesPathData = useMemo(() => {
    return pathData.filter((item) => !!item.lanes.length && !!item.stations.length);
  }, [pathData]);
  const maxLength = freshLanesPathData.length;

  const renderStationName = freshLanesPathData.reduce((acc, cur, idx) => {
    const arr = cur.stations
      .filter((_, idx) => idx === cur.stations.length - 1 || !idx)
      .map((item) => item.stationName);
    if (idx === freshLanesPathData.length - 1) return [...acc, ...arr];
    return [...acc, ...arr.slice(0, 1), ...arr.slice(2)];
  }, [] as string[]);

  const isOverNameLength = renderStationName.some((item) => item.length > 5);

  return (
    <View style={{ marginBottom: isOverNameLength ? 32 : 16, marginTop: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: maxLength > 3 ? betweenPathMargin : null,
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
          {freshLanesPathData.map(({ lanes, sectionTime }, idx) => {
            if (maxLength > 3 && idx <= 1) {
              return (
                <React.Fragment key={lanes[0].stationCode + idx + sectionTime + 'lessLine'}>
                  <PathBar
                    stationCode={lanes[0].stationCode}
                    isLast={idx === 1}
                    isFirst={idx === 0}
                    issues={lanes[0].issueSummary}
                  />
                </React.Fragment>
              );
            }
            if (maxLength <= 3) {
              return (
                <React.Fragment key={lanes[0].stationCode + idx + sectionTime + 'lessLine'}>
                  <PathBar
                    stationCode={lanes[0].stationCode}
                    isLast={maxLength - 1 === idx}
                    isFirst={idx === 0}
                    issues={lanes[0].issueSummary}
                  />
                </React.Fragment>
              );
            }
            return <></>;
          })}
        </View>
        {/* 지하철 호선 및 이름, 환승역 3개 이하 */}
        {freshLanesPathData.map(({ stations, lanes, sectionTime }, idx) => {
          if (maxLength > 3 && idx <= 2) {
            return (
              <React.Fragment key={stations[0].stationName + idx + sectionTime + 'lessName'}>
                <PathLineNumName lane={lanes[0]} stationName={stations[0].stationName} />
              </React.Fragment>
            );
          }
          if (maxLength <= 3) {
            return (
              <React.Fragment key={stations[0].stationName + idx + sectionTime + 'lessName'}>
                <PathLineNumName lane={lanes[0]} stationName={stations[0].stationName} />
                {maxLength - 1 === idx && (
                  <PathLineNumName lane={lanes[0]} stationName={arriveStationName} />
                )}
              </React.Fragment>
            );
          }
          return <></>;
        })}
      </View>

      {/* 환승역이 3개 이상일 때 렌더링 */}
      {maxLength > 3 && (
        <View
          style={{
            marginRight: maxLength === 3 ? 0 : 18,
            position: 'relative',
            width: maxLength === 3 ? '50%' : '100%',
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
            {freshLanesPathData.map(({ lanes, sectionTime }, idx) => (
              <React.Fragment key={lanes[0].stationCode + idx + sectionTime + 'moreLine'}>
                {idx >= 2 && (
                  <PathBar
                    stationCode={lanes[0].stationCode}
                    isFirst={idx === 2}
                    isLast={maxLength === 3 ? false : maxLength - 1 === idx}
                    issues={lanes[0].issueSummary}
                  />
                )}
              </React.Fragment>
            ))}
          </View>

          {/* 지하철 호선 및 이름 */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            {freshLanesPathData.map(({ stations, lanes, sectionTime }, idx) => {
              if (idx >= 2) {
                return (
                  <React.Fragment key={stations[0].stationName + idx + sectionTime + 'moreName'}>
                    <PathLineNumName lane={lanes[0]} stationName={stations[0].stationName} />
                    {maxLength - 1 === idx && (
                      <PathLineNumName lane={lanes[0]} stationName={arriveStationName} />
                    )}
                  </React.Fragment>
                );
              }
            })}
          </View>
        </View>
      )}
    </View>
  );
};

export default SubwaySimplePath;
