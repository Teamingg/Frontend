import { client } from "../instance/client";
import {ProjectTeam} from "@/types/user/myTeamRes";

export const getUserProjectTeam = async (
  userId: string
): Promise<ProjectTeam[]> => {
  const response = await client.get(`/users/${userId}/project`);
  return response.data.data;
};

export default getUserProjectTeam;