import { Path, SubPath } from '@/global/apis/entity';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Temp: undefined;
  Login: undefined;
  MainBottomTab: { screen: 'Home' };
  SearchNavigation: { screen: keyof SearchStackParamList; params?: Path; route?: undefined };
  EditRouteNavigation: { screen: keyof EditRouteStackParamList; params?: { pathId: number } };
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
