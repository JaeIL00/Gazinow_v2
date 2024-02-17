import axios, { AxiosError } from "axios";
import apiUrls from "./url";
import localStorageFunc from "@global/utils/localStorage";
import { MemberReissue } from "./entity";
import { STORAGE_ACCESS_KEY, STORAGE_REFRESH_KEY } from "@global/constants";

const GaziAPI = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

GaziAPI.interceptors.request.use(async (requestConfig) => {
  const token = localStorageFunc.get(STORAGE_ACCESS_KEY);
  requestConfig.headers.Authorization = `Bearer ${token}`;
  return requestConfig;
});

GaziAPI.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // network error
    if (!error.response || error.response.status !== 401) {
      throw error;
    }

    const refreshToken = localStorageFunc.get(STORAGE_REFRESH_KEY);

    if (!refreshToken) {
      // FIXME: 리다이렉트를 어디로?
      // return redirectLoginPage();
    }

    const response = await axios.post<MemberReissue>(
      apiUrls.member_reissue,
      null,
      {
        baseURL: import.meta.env.VITE_BACKEND_URL,
        headers: { Authorization: `Bearer ${refreshToken}` },
      }
    );

    // 리다이렉트 유효성 분기점
    if (response.status === 200) {
      localStorageFunc.set(STORAGE_ACCESS_KEY, response.data.accessToken);
      return GaziAPI(error.config || {});
    } else {
      localStorageFunc.removeAll();
      // FIXME: 리다이렉트를 어디로?
      // return redirectLoginPage();
    }
  }
);

export default GaziAPI;
