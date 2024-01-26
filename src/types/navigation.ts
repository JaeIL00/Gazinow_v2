import { NavigatorScreenParams } from '@react-navigation/native';
import { Path, SubPath } from './apis/searchTypes';

export type RootStackParamList = {
  Temp: undefined;
  Login: undefined;
  MainBottomTab: NavigatorScreenParams<{ Home: undefined }>;
  SearchNavigation: { screen: keyof SearchStackParamList; params?: Path; route?: undefined };
  EditRouteNavigation: { screen: string; params: { pathId: number } };
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
  NameNewRoutePage: { screen: string; params: number };
};

export type SearchStackParamList = {
  SubwaySearch: undefined;
  SubwayPathResult: {
    departure: { name: string; line: string };
    arrival: { name: string; line: string };
  };
  SubwayPathDetail: { state?: SubPath[]; pathId?: number };
};
