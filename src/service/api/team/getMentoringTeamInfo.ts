import {instance} from "@/service/api/instance/axiosInstance";

export const getMentoringTeamInfo = async (params) => {
    const response = await instance.get(`/mentoring/teams/${params}`);
    return response.data.data;
}