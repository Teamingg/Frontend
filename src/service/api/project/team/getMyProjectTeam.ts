"use server";
import ProjectTeam from "@/types/team/project/projectTeam";
import { server } from "../../instance/server/server";

const getMyProjectTeam = async (): Promise<ProjectTeam[]> => {
  const response = await server.get("/user/project");

  return response.data.data;
};

export default getMyProjectTeam;
