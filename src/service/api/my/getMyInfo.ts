'use server';
import { UserInfo } from "@/types/user/userInfo";
import {createServerInstance} from "@/service/api/instance/server";
import {handleServerError} from "@/service/handleServerError";

export const getMyInfo = async (): Promise<UserInfo> => {
  try {
    const server = await createServerInstance();
    const { data } = await server.get("/users");
    if (!data || !data.data) throw new Error("서버 응답이 올바르지 않습니다.");
    return data.data;
  } catch (error) {
    return handleServerError(error, "getMyInfo");
  }
};