export type RootStackParamList = {
  Temp: undefined;
  Login: undefined;
  MainBottomTab: undefined;
  SearchNavigation: { screen: 'SubwaySearch' };
  EditRouteNavigation: { screen: string };
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
};

export type SearchStackParamList = {
  SubwaySearch: undefined;
  SubwayPathResult: {
    departure: { name: string; line: string };
    arrival: { name: string; line: string };
  };
  SubwayPathDetail: undefined;
};
