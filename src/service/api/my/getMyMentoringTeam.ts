"use server";

import { MentoringTeam } from "@/types/user/myTeamRes";
import { createServerInstance } from "../instance/server";
import {handleServerError} from "@/service/handleServerError";

export const getMyMentoringTeam = async (): Promise<MentoringTeam[]> => {
  try {
    const server = await createServerInstance();
    const { data } = await server.get("/users/mentoring/teams");
    if (!data || !data.data) throw new Error("서버 응답이 올바르지 않습니다.");
    return data.data;
  } catch (error) {
    return handleServerError(error, "getMyInfo");
  }
};