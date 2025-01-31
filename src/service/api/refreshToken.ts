import { getCookie } from "@/utils/cookies";
import { client } from "./instance/client/client";

export const refreshToken = async (refreshToken?: string) => {
  if (!refreshToken) {
    refreshToken = await getCookie("refreshToken");
  }
  const response = await client.post(
    "/token/refresh",
    {},
    {
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    }
  );

  if (response.status === 401) {
    throw new Error("토큰 갱신에 실패했습니다.");
  }

  return response.data.accessToken;
};
