export interface LoginFetchProps {
  email: string;
  password: string;
}

export interface TokenTypes {
  accessToken: string;
  refreshToken: string;
}

export interface LoginFetchResponse extends TokenTypes {}
