import { UserInfo } from "@/types/user/userInfo";
import { createServerInstance } from "../instance/server";

export const getUserInfo = async (userId: string): Promise<UserInfo> => {
  const server = await createServerInstance();

  const response = await server.get(`/users/${userId}`);
  console.log("response", response.data.data);
  return response.data.data;
};
