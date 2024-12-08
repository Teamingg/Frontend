import { userInfo } from "../model/userInfo";

import { instance } from "@/shared/api/axiosInstance";

export const getUserInfo = async (): Promise<userInfo> => {
  const response = await instance.get("/user");

  if (response.status !== 200) {
    throw new Error("정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
  }

  return response.data.data;
};
