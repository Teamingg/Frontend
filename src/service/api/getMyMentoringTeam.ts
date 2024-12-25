import { instance } from "@/service/api/instance/axiosInstance";
import MentoringTeam from "@/types/team/mentoring/mentoringTeam";

const getMyMentoringTeam = async (): Promise<MentoringTeam[]> => {
  const response = await instance.get("/mentoring/teams");

  return response.data.data;
};

export default getMyMentoringTeam;
