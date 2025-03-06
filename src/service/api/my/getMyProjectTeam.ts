"use server";
import { ProjectTeam } from "@/types/user/myTeamRes";
import { createServerInstance } from "../instance/server";

const getMyProjectTeam = async (): Promise<ProjectTeam[]> => {
  const server = await createServerInstance();
  const { data } = await server.get("/users/project");
  return data.data;
};

export default getMyProjectTeam;