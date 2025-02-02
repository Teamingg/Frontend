"use server";

import { UserInfo } from "@/types/user/userInfo";
import { server } from "../instance/server/server";

export const getUserInfo = async (): Promise<UserInfo> => {
  const response = await server.get("/users");

  return response.data.data;
};
