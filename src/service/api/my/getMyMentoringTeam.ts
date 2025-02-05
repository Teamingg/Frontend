"use server";

import MentoringTeam from "@/types/team/mentoring/mentoringTeam";
import { server } from "../instance/server";

const getMyMentoringTeam = async (): Promise<MentoringTeam[]> => {
  const response = await server.get("/users/mentoring/teams");

  return response.data.data;
};

export default getMyMentoringTeam;
