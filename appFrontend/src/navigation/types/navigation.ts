import { Path, SubPath } from '@/global/apis/entity';

export type RootStackParamList = {
  Temp: undefined;
  AuthStack: { screen: 'Landing' };
  IssueStack: {
    screen: 'SearchStation' | 'IssueDetail';
    params?: { searchType: '출발역' | '도착역' };
  };
  MainBottomTab: { screen: 'homeStack' };
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

export type IssueStackParamList = {
  SearchStation: undefined;
  IssueDetail: undefined;
};
