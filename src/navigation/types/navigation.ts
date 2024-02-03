import { Path, SubPath, SubwayLine } from '@/global/apis/entity';

export type RootStackParamList = {
  Temp: undefined;
  SignIn: undefined;
  MainBottomTab: { screen: 'homeStack' };
  EditRouteNavigation: {
    screen: keyof EditRouteStackParamList;
    params?: { pathId: number | null };
  };
  MyNavigation: { screen: keyof MyStackParamList };
};

export type EditRouteStackParamList = {
  SavedRoutes: undefined;
  AddNewRoute: undefined;
  SubwaySearch: { isBackBtn: boolean };
  SubwayPathResult: undefined;
  SubwayPathDetail: undefined;
  NameNewRoute: {
    screen: string;
    params?: { pathId?: number };
  };
};

export type HomeStackParamList = {
  Home: undefined;
  SubwayPathResult: undefined;
  SubwayPathDetail: { state?: Path | SubPath[]; pathId?: number | null };
};

export type MyStackParamList = {
  Nickname: undefined;
  MyRoot: undefined;
  ChangeNickname: undefined;
  AccountManage: undefined;
  NotificationSettings: undefined;
  Notification: undefined;
  ChangePw: undefined;
  ConfirmQuit: undefined;
  Contract: undefined;
};
