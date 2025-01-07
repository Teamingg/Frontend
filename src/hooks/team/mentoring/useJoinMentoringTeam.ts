import { instance } from "@/service/api/instance/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const applyMentoringtTeam = async (boardId: string) => {
  await instance.post(`/mentoring/posts/${boardId}/participants`);
};

const useJoinMentoringTeam = (boardId: string) => {
  const { mutate, isSuccess } = useMutation({
    mutationFn: async () => await applyMentoringtTeam(boardId),
  });

  return {
    mutate,
    isSuccess,
  };
};

export default useJoinMentoringTeam;
