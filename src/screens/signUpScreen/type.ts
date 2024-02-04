export type SignUpStepType = 'email' | 'password' | 'nickname' | 'complete';
export interface SightUpResponse {
  email: string;
  nickName: string;
}
export interface SignUpParams {
  email: string;
  password: string;
  nickname: string;
}
