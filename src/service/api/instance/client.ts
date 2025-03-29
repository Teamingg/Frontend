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
    const token = await getCookie("refresehToken");

    console.log(token);
    // 원래 응답 객체
    const originalRequest = error.config;
    // 액세스 토큰이 만료되었을 때 (401)
    if (error.response.status === 401 && token && !originalRequest._retry) {
      // retry 무한루프 방지
      originalRequest._retry = true;

      try {
        await refreshToken();

        // refreshToken() 로 액세스토큰 재발급 후 원래 요청 다시시도
        return client(originalRequest);
      } catch {
        return handleError(error.response.status);
      }
    }

    handleError(error.response.status);

    return Promise.reject(error.response.data);
  }
);
