export type RootStackParamList = {
  Temp: undefined;
  Login: undefined;
  MainBottomTab: undefined;
  SearchNavigation: { screen: 'SubwaySearch', route: undefined };
  EditRouteNavigation: { screen: string, params: { pathId: number } };
};

export type EditRouteStackParamList = {
  SavedRoutesPage: undefined;
  AddNewRoutePage: undefined;
  SubwaySearch: undefined;
  SubwayPathResult: {
    departure: { name: string; line: string };
    arrival: { name: string; line: string };
  };
  SubwayPathDetail: undefined;
  NameNewRoutePage: { screen: string, params: number };
};

export type SearchStackParamList = {
  SubwaySearch: undefined;
  SubwayPathResult: {
    departure: { name: string; line: string };
    arrival: { name: string; line: string };
  };
  SubwayPathDetail: { pathId: number };
};
