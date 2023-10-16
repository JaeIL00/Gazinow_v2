export type RootStackParamList = {
  Login: undefined;
  MainBottomTab: undefined;
  SearchNavigation: { screen: 'SubwaySearch'; where: 'departure' | 'arrival' };
};

export type SearchStackParamList = {
  SubwaySearch: { where: 'departure' | 'arrival' };
};
