import GaziAPI from "@global/apis";
import apiUrls from "@global/apis/url";
import { AxiosError } from "axios";
import { IssueGet } from "./entity";
import * as Sentry from "@sentry/react";

/**
 * 상세 이슈 조회
 */
export const getIssueDetail = async (params: { id: string }) => {
  try {
    const res = await GaziAPI.get<{ data: IssueGet }>(apiUrls.issue_get, {
      params,
    });
    return res.data.data;
  } catch (err) {
    Sentry.captureException(err);
    const error = err as AxiosError;
    throw error;
  }
};

/**
 * 도움돼요 추가
 */
export const postLike = async (issueId: number) => {
  try {
    const res = await GaziAPI.post(`${apiUrls.like}?issueId=${issueId}`);
    return res.data.data;
  } catch (err) {
    Sentry.captureException(err);
    const error = err as AxiosError;
    throw error;
  }
};
