export type SubwayInfoResponse = {
  SearchSTNBySubwayLineInfo: {
    row: {
      FR_CODE: string;
      LINE_NUM: string;
      STATION_CD: string;
      STATION_NM: string;
      STATION_NM_CHN: string;
      STATION_NM_ENG: string;
      STATION_NM_JPN: string;
    }[];
  };
};
