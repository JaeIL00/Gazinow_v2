import { Path, SubPath } from '@/global/apis/entity';

export type RootStackParamList = {
  Temp: undefined;
  AuthStack: { screen: 'Landing' };
  MainBottomTab: { screen: 'homeStack' };
  MyStack: { screen: keyof MyStackParamList };
};

export type AuthStackStackParamList = {
  Landing: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  SubwayPathResult: undefined;
  SubwayPathDetail: { state?: Path | SubPath[]; pathId?: number | null };
  SavedRoutes: undefined;
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
