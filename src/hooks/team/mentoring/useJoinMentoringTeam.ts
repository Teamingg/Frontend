import { queryclient } from "@/lib/getQueryClient";
import { client } from "@/service/api/instance/client";
import { useMutation } from "@tanstack/react-query";

const applyMentoringtTeam = async (boardId: string) => {
  await client.post(`/mentoring/posts/${boardId}/participants`);
};

const useJoinMentoringTeam = (boardId: string) => {
  const { mutate, isSuccess } = useMutation({
    mutationFn: async () => await applyMentoringtTeam(boardId),
    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: ["mentoring", "post", boardId],
      });
    },
  });

  return {
    mutate,
    isSuccess,
  };
};

export default useJoinMentoringTeam;
