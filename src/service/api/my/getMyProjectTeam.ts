"use server";
import ProjectTeam from "@/types/team/projectTeam";
import {createServerInstance} from "../instance/server";

const getMyProjectTeam = async (): Promise<ProjectTeam[]> => {
  const server = await createServerInstance();
  const { data } = await server.get("/users/1/project");
  console.log('getMyProjectTeam')
  console.log(data)
  return data.data;
};

export default getMyProjectTeam;