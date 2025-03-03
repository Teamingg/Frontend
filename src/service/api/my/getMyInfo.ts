"use server";
import { UserInfo } from "@/types/user/userInfo";
import { server } from "../instance/server";

export const getMyInfo = async (): Promise<UserInfo> => {
  const { data } = await server.get("/users");
  console.log('getMyInfo');
  console.log(data);
  return data.data;
};