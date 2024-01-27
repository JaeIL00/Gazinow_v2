import { Path, SubPath } from '@/global/apis/entity';

export type RootStackParamList = {
  Temp: undefined;
  Login: undefined;
  MainBottomTab: { screen: 'Home' };
  SearchNavigation: { screen: keyof SearchStackParamList; params?: Path; route?: undefined };
  EditRouteNavigation: { screen: keyof EditRouteStackParamList; params?: { pathId: number } };
  MyNavigation: { screen: keyof MyStackParamList };
};

export type EditRouteStackParamList = {
  SavedRoutes: undefined;
  AddNewRoute: undefined;
  SubwaySearch: { isBackBtn: boolean };
  SubwayPathResult: {
    departure: { name: string; line: string };
    arrival: { name: string; line: string };
  };
  SubwayPathDetail: undefined;
  NameNewRoute: { screen: string; params: number };
};

export type SearchStackParamList = {
  SubwaySearch: { isBackBtn: boolean };
  SubwayPathResult: {
    departure: { name: string; line: string };
    arrival: { name: string; line: string };
  };
  SubwayPathDetail: { state?: SubPath[]; pathId?: number };
};

export type MyStackParamList = {
  Nickname: undefined;
  MyRoot: undefined;
  ChangeNickname: undefined;
  AccountManage: undefined;
  NotificationSettings: undefined;
  ChangePw: undefined;
  ConfirmQuit: undefined;
  Contract: undefined;
};
