import { Path, SubPath, SubwayLine } from '@/global/apis/entity';

export type RootStackParamList = {
  Temp: undefined;
  SignIn: undefined;
  SignUp: undefined;
  MainBottomTab: { screen: 'homeStack' };
  MyNavigation: { screen: keyof MyStackParamList };
};

export type HomeStackParamList = {
  Home: undefined;
  SubwayPathResult: { isSavingNewRoute: boolean | undefined };
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
