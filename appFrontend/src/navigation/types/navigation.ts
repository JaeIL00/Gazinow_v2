import { Path, SubPath } from '@/global/apis/entity';

export type RootStackParamList = {
  AuthStack: { screen: 'Landing' };
  IssueStack: {
    screen: 'SearchStation' | 'IssueDetail';
    params?: { searchType: '출발역' | '도착역' };
  };
  MainBottomTab: { screen: 'homeStack' };
  NewRouteNavigation: { screen: 'SavedRoutes' };
  MyPageNavigation: { screen: unknown };
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

export type NewRouteStackParamList = {
  SavedRoutes: undefined;
  Swap: undefined;
  Search: undefined;
  Result: undefined;
  Detail: { state?: Path | SubPath[]; pathId?: number | null };
  Name: { state?: Path | SubPath[]; pathId?: number | null };
};

export type MyPageStackParamList = {
  MyRootScreen: undefined;
  ChangeNickNameModal: undefined;
  ChangePwModal: undefined;
  ConfirmPwModal: undefined;
  ConfirmQuitModal: undefined;
  ManageAccountModal: undefined;
  NotiOnModal: undefined;
  NotiSettingsModal: undefined;
  SubscribeTermsModal: undefined;
  PersonalTermsModal: undefined;
};

export type IssueStackParamList = {
  SearchStation: undefined;
  IssueDetail: undefined;
};
