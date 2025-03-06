'use server';
import { UserInfo } from "@/types/user/userInfo";
import {createServerInstance} from "@/service/api/instance/server";

export const getMyInfo = async (): Promise<UserInfo> => {
  const server = await createServerInstance();
  const { data } = await server.get("/users");
  return data.data;
};