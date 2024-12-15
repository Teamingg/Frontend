import axios from "axios";
import setCookie from "../utils/auth/setCookie";
import getCookie from "../utils/auth/getCookie";
import removeCookie from "../utils/auth/removeCookie";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshToken = async () => {
  const refreshToken = await getCookie("refreshToken");
  const response = await instance.post("/token/refresh", { refreshToken });
};

instance.interceptors.response.use(
  // 응답에 성공했을 때
  (response) => response,

  // 응답에 실패했을 때
  async (error) => {
    // 원래 응답 객체
    const originalRequest = error.config;

    // 액세스 토큰이 만료되었을 때 (401)
    if (error.response.status === 401 && !originalRequest._retry) {
      // retry 무한루프 방지
      originalRequest._retry = true;

      try {
        await refreshToken();

        // refreshToken() 로 액세스토큰 재발급 후 원래 요청 다시시도
        return instance(originalRequest);
      } catch {
        // 토큰 갱신에 실패 시 로그아웃 처리
        await removeCookie("accessToken");
        await removeCookie("refreshToken");
      }
    }

    return Promise.reject(error);
  }
);
