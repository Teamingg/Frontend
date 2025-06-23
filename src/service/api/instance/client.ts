import axios from "axios";

import handleError from "@/service/handleError";
import { refreshToken } from "../refreshToken";
import { getCookie } from "@/utils/cookies";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  // 응답에 성공했을 때
  (response) => response,

  // 응답에 실패했을 때
  async (error) => {
    const token = await getCookie("refreshToken");
    const originalRequest = error.config;

    // 401 에러이고 토큰이 있고 재시도하지 않은 요청일 경우
    if (error.response?.status === 401 && token && !originalRequest._retry) {
      try {
        // retry 무한루프 방지
        originalRequest._retry = true;

        // 토큰 갱신 시도
        await refreshToken();

        // 원래 요청 재시도
        return client(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 시 401 에러 throw
        throw new Error("Unauthorized");
      }
    }

    // 다른 에러는 그대로 throw
    if (error.response) {
      handleError(error.response.status);
    }

    return Promise.reject(error);
  }
);
