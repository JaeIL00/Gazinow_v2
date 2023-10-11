export interface LoginFetchProps {
  email: string;
  password: string;
}

export interface LoginFetchResponse {
  accessToken: string;
  refreshToken: string;
}
