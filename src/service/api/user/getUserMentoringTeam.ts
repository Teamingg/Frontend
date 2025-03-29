import { MentoringTeam } from "@/types/user/myTeamRes";
import { client } from "../instance/client";

export const getUserMentoringTeam = async (
  userId: string
): Promise<MentoringTeam[]> => {
  const response = await client.get(`/users/${userId}/mentoring/teams`);
  return response.data.data;
};

export default getUserMentoringTeam;
