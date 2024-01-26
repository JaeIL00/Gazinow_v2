import { NavigatorScreenParams } from '@react-navigation/native';
import { SubPath } from './apis/searchTypes';

export type RootStackParamList = {
  Temp: undefined;
  Login: undefined;
  MainBottomTab: NavigatorScreenParams<{ Home: undefined }>;
  SearchNavigation: { screen: keyof SearchStackParamList; params: SubPath[] };
};

export type SearchStackParamList = {
  SubwaySearch: undefined;
  SubwayPathResult: {
    departure: { name: string; line: string };
    arrival: { name: string; line: string };
  };
  SubwayPathDetail: { state: SubPath[] };
};
