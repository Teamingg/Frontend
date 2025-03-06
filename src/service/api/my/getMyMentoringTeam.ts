"use server";

import { MentoringTeam } from "@/types/user/myTeamRes";
import { createServerInstance } from "../instance/server";

export const getMyMentoringTeam = async (): Promise<MentoringTeam[]> => {
  const server = await createServerInstance();
  const { data } = await server.get("/users/mentoring/teams");
  return data.data;
};