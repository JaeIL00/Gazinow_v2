import { AxiosError } from "axios";
import GaziAPI from ".";
import * as Sentry from "@sentry/react";
import apiUrls from "./url";
import { Login } from "./entity";

/**
 * 로그인
 */
export const postLogin = async (data: { email: string; password: string }) => {
  try {
    const res = await GaziAPI.post<{ data: Login }>(apiUrls.member_login, data);
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};

/**
 * 로그아웃
 */
export const postLogout = async (data: {
  accessToken: string;
  refreshToken: string;
}) => {
  try {
    const res = await GaziAPI.post(apiUrls.member_logout, data);
    return res.data.data;
  } catch (err) {
    Sentry.captureException(err);
    const error = err as AxiosError;
    throw error;
  }
};

/**
 * 회원 탈퇴
 */
export const deleteMember = async () => {
  try {
    await GaziAPI.delete(apiUrls.member_delete_member, { data: {} });
    Sentry.captureMessage("유저가 탈퇴했어요");
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};
