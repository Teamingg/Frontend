"use server";

import MentoringTeam from "@/types/team/mentoringTeam";
import { server } from "../instance/server";

export const getMyMentoringTeam = async (): Promise<MentoringTeam[]> => {
  const { data } = await server.get("/users/1/mentoring/teams");
  console.log('getMyMentoringTeam')
  console.log(data)
  return data.data;
};