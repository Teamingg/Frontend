import { client } from "../instance/client";

import { UserInfo } from "@/types/user/userInfo";

export const getUserInfo = async (userId: string): Promise<UserInfo> => {
  const response = await client.get(`/users/${userId}`);
  console.log("response", response.data.data);
  return response.data.data;
};
