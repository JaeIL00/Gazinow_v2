import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Temp: undefined;
  Login: undefined;
  MainBottomTab: NavigatorScreenParams<{ Home: undefined }>;
  SearchNavigation: NavigatorScreenParams<SearchStackParamList>;
};

export type SearchStackParamList = {
  SubwaySearch: undefined;
  SubwayPathResult: {
    departure: { name: string; line: string };
    arrival: { name: string; line: string };
  };
  SubwayPathDetail: undefined;
};
