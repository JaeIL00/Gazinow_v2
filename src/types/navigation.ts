export type RootStackParamList = {
  Login: undefined;
  MainBottomTab: undefined;
  SearchNavigation: { screen: 'SubwaySearch' };
};

export type SearchStackParamList = {
  SubwaySearch: undefined;
  SubwayPathResult: {
    departure: { name: string; line: string };
    arrival: { name: string; line: string };
  };
  SubwayPathDetail: undefined;
};
