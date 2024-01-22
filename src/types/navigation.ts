export type RootStackParamList = {
  Temp: undefined;
  Login: undefined;
  MainBottomTab: undefined;
  SearchNavigation: { screen: 'SubwaySearch' };
  EditRouteNavigation: undefined;
};

export type EditRouteStackParamList ={
  SavedRoutesPage: undefined;
  AddNewRoutePage: undefined;
}

export type SearchStackParamList = {
  SubwaySearch: undefined;
  SubwayPathResult: {
    departure: { name: string; line: string };
    arrival: { name: string; line: string };
  };
  SubwayPathDetail: undefined;
};
