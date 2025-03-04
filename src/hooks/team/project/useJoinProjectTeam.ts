import { queryclient } from "@/lib/getQueryClient";
import { client } from "@/service/api/instance/client";

import { useMutation } from "@tanstack/react-query";

interface ApplyProjectTeamProps {
  teamId: number;
  recruitCategory: string;
}

const applyProjectTeam = async ({
  teamId,
  recruitCategory,
}: ApplyProjectTeamProps) => {
  const response = await client.post(`/project/join`, {
    teamId,
    recruitCategory,
  });

  return response;
};

const useJoinProjectTeam = () => {
  const { mutate, isSuccess } = useMutation({
    mutationFn: async ({ teamId, recruitCategory }: ApplyProjectTeamProps) =>
      await applyProjectTeam({ teamId, recruitCategory }),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["project", "post"] });
    },
    onError: (error) => {
      // console.log(error);
    },
  });

  return { mutate, isSuccess };
};

export default useJoinProjectTeam;
