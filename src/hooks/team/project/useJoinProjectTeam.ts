import { queryclient } from "@/lib/getQueryClient";
import { instance } from "@/service/api/instance/axiosInstance";

import { useMutation } from "@tanstack/react-query";

interface ApplyProjectTeamProps {
  teamId: number;
  recruitCategory: string;
}

const applyProjectTeam = async ({
  teamId,
  recruitCategory,
}: ApplyProjectTeamProps) => {
  await instance.post(`/project/join`, {
    teamId,
    recruitCategory,
  });
};

const useJoinProjectTeam = () => {
  const { mutate, isSuccess } = useMutation({
    mutationFn: async ({ teamId, recruitCategory }: ApplyProjectTeamProps) =>
      await applyProjectTeam({ teamId, recruitCategory }),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["project", "post"] });
    },
  });

  return { mutate, isSuccess };
};

export default useJoinProjectTeam;
