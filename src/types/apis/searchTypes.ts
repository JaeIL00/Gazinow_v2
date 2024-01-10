export type subwayLine =
  | '01호선'
  | '02호선'
  | '3호선'
  | '04호선'
  | '05호선'
  | '06호선'
  | '07호선'
  | '08호선'
  | '09호선'
  | '공항철도'
  | '경의중앙선'
  | '경춘선'
  | '수인분당선'
  | '신분당선'
  | '경강선'
  | '서해선'
  | '인천선'
  | '인천2호선'
  | '용인경전철'
  | '의정부경전철'
  | '우이신설경전철'
  | '김포도시철도';

export interface SearchSubwayNameTypes {
  data: {
    name: string;
    line: subwayLine;
  }[];
}

export interface SearchHistoryTypes {
  data: { id: number; stationName: string; stationLine: string; stationCode: number }[];
}

export interface SearchPathsTypes {
  paths: {
    totalTime: number;
    subwayTransitCount: number;
    firstStartStation: string;
    lastEndStation: string;
    subPaths: {
      trafficType: number;
      distance: number;
      sectionTime: number;
      stationCount: number;
      lanes: {
        name: string;
        subwayCode: number;
        startName: string;
        endName: string;
      }[];
      subways: {
        index: number;
        stationName: string;
      }[];
    }[];
  }[];
}
