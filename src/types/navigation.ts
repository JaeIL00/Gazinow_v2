export type RootStackParamList = {
  Login: undefined;
  MainBottomTab: undefined;
  SearchNavigation: { screen: 'SubwaySearch' };
};

export type SearchStackParamList = {
  SubwaySearch: undefined;
  SubwayPathResult: {
    departure: string;
    arrival: string;
  };
};
