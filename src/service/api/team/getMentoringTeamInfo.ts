import {instance} from "@/service/api/instance/axiosInstance";

export const getMentoringTeamInfo = async () => {
    const response = await instance.get("/mentoring/teams/1");
    return response.data.data;
}