import {instance} from "@/service/api/instance/axiosInstance";

export const getProjectTeamInfo = async () => {
    const response = await instance.get("/project/team/5");
    return response.data.data;
}