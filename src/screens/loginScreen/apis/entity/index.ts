/**
 * 로그인폼
 */
export interface LoginFormTypes {
  email: string;
  password: string;
}

/**
 * 로그인 응답
 */
export interface LoginFetchResponse {
  grantType: 'Bearer';
  memberId: number;
  nickName: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpirationTime: number;
  refreshTokenExpirationTime: number;
  notificationByKeyword: boolean;
  notificationByRepost: boolean;
  notificationByLike: boolean;
  firebaseToken: boolean;
}

/**
 * 로그아웃
 */
export interface LogoutFetchData {
  accessToken: string;
  refreshToken: string;
}
