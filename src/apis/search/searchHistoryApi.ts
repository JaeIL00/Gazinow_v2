export const searchHistoryFetch = async () => {
  // 추후 서버 연결
  // return await axiosInstance.post<LoginFetchResponse>('/api/v1/member/login', data);

  // mock
  const mockData = [
    {
      id: 0,
      stationName: '분당',
      stationLine: '1호선',
      stationCode: 242,
    },
    {
      id: 1,
      stationName: '금정',
      stationLine: '4호선',
      stationCode: 42,
    },
  ];

  return mockData;
};
