export interface SignUpResponse {
  email: string;
  nickName: string;
  accessToken: string;
  refreshToken: string;
}

export interface SignUpParams {
  email: string;
  password: string;
  nickname: string;
}
