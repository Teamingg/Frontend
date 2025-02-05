import { client } from "../instance/client";

import MentoringTeam from "@/types/team/mentoring/mentoringTeam";

export const getUserMentoringTeam = async (
  userId: string
): Promise<MentoringTeam[]> => {
  const response = await client.get(`/users/${userId}/mentoring/teams`);
  return response.data.data;
};

export default getUserMentoringTeam;
