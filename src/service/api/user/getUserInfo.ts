"use server";

import { instance } from "@/service/api/instance/axiosInstance";

import { UserInfo } from "@/types/user/userInfo";
import { cookies } from "next/headers";

export const getUserInfo = async (): Promise<UserInfo> => {
  const response = await instance.get("/users", {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  if (response.status !== 200) {
    throw new Error("정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
  }

  return response.data.data;
};
